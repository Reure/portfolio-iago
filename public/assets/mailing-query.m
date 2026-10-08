// Consultas reais: estrutura e regras preservadas.
// Endereço interno oculto. A fonte precisa ser configurada antes de executar.
// As referências são nomes de campos; nenhum registro de cliente está incluído.
section Section1;

shared Cabeçalho_Mainling = let
    Fonte = SharePoint.Contents("[ENDERECO_SHAREPOINT_OCULTO]", [ApiVersion = 15]),
    #"Shared Documents" = Fonte{[Name="Shared Documents"]}[Content],
    #"1  Reports" = #"Shared Documents"{[Name="1. Reports"]}[Content],
    #"08  Célula ativo" = #"1  Reports"{[Name="08. Célula ativo"]}[Content],
    #"Testes" = #"08  Célula ativo"{[Name="Testes"]}[Content],
    #"Mailling - Layout txt" = #"Testes"{[Name="Mailling - Layout.txt"]}[Content],
    #"CSV Importado" = Csv.Document(#"Mailling - Layout txt",[Delimiter=";", Columns=9, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Cabeçalhos Promovidos" = Table.PromoteHeaders(#"CSV Importado", [PromoteAllScalars=true]),
    #"Tipo Alterado" = Table.TransformColumnTypes(#"Cabeçalhos Promovidos",{{"CodigoCampanha", Int64.Type}, {"CodigoCliente", Int64.Type}, {"TelefoneTipo", type text}, {"DDD", Int64.Type}, {"NumeroTelefone", Int64.Type}})
in
    #"Tipo Alterado";

shared Base_Contatos = let
    Fonte = SharePoint.Contents("[ENDERECO_SHAREPOINT_OCULTO]", [ApiVersion = 15]),
    #"Shared Documents" = Fonte{[Name="Shared Documents"]}[Content],
    #"1  Reports" = #"Shared Documents"{[Name="1. Reports"]}[Content],
    #"08  Célula ativo" = #"1  Reports"{[Name="08. Célula ativo"]}[Content],
    #"Base_Beneficiários_Discagem csv" = #"08  Célula ativo"{[Name="Base_Beneficiários_Discagem.csv"]}[Content],
    #"CSV Importado" = Csv.Document(#"Base_Beneficiários_Discagem csv",[Delimiter=";", Columns=18, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Cabeçalhos Promovidos" = Table.PromoteHeaders(#"CSV Importado", [PromoteAllScalars=true]),
    #"Filtrado ""Titular e plano CPF""" = Table.SelectRows(#"Cabeçalhos Promovidos", each ([Tipo contratacao] = "Individual_Familiar") and ([Status segurado] = "Titular") and ([Nr seq plano] = "                         ")),
    #"Tipo Alterado1" = Table.TransformColumnTypes(#"Filtrado ""Titular e plano CPF""",{{"Dt inclusao operadora", type date}}),
    #"Dividir Coluna por Delimitador" = Table.SplitColumn(#"Tipo Alterado1", "Telefone 2", Splitter.SplitTextByDelimiter("/", QuoteStyle.Csv), {"Telefone 2", "Telefone 3"}),
    #"Colunas Não Dinâmicas" = Table.UnpivotOtherColumns(#"Dividir Coluna por Delimitador", {"Nr seq segurado", "Nome", "Idade em anos", "Status segurado", "Carteira", "Tipo contratacao", "Nr cpf", "Nr seq contrato", "Dt contratacao", "Dt inclusao operadora", "Status atendimento", "Regulamentacao", "Seq pagador", "Pagador", "Nr seq plano", "Ds plano"}, "Atributo", "N_Telefone"),
    #"Texto Limpo" = Table.TransformColumns(#"Colunas Não Dinâmicas",{{"N_Telefone", Text.Clean, type text}}),
    #"Texto Aparado" = Table.TransformColumns(#"Texto Limpo",{{"N_Telefone", Text.Trim, type text}}),
    #"Linhas Filtradas" = Table.SelectRows(#"Texto Aparado", each ([N_Telefone] <> "")),
    Contatos_Limpos = Table.AddColumn(#"Linhas Filtradas", "N_Limpos", each Text.Remove([N_Telefone], {"(", ")", "-", " "})),
    #"Adicionado ""Validação""" = Table.AddColumn(Contatos_Limpos, "Validação", each Text.Length([N_Limpos])),
    #"Adicionado ""NumeroTelefone""" = Table.AddColumn(#"Adicionado ""Validação""", "NumeroTelefone", each 
        if [Validação] = 11 and Text.Start([N_Limpos], 1) = "0"
        then Text.Combine({Text.Range([N_Limpos], 2, 2), Text.End([N_Limpos], 8)})
        else if [Validação] = 11
        then [N_Limpos]
        else if [Validação] = 10 and Text.Start(Text.End([N_Limpos], 8), 1) = "9"
        then Text.Combine({"849", Text.End([N_Limpos], 8)})
        else if [Validação] = 10 and Text.Start(Text.End([N_Limpos], 8), 1) = "8"
        then Text.Combine({"849", Text.End([N_Limpos], 8)})
        else if [Validação] = 10 and Text.Start(Text.End([N_Limpos], 8), 1) <> "9"
        then [N_Limpos]
        else if [Validação] = 10 and Text.Start(Text.End([N_Limpos], 8), 1) <> "8"
        then [N_Limpos]
        else if [Validação] = 9
        then Text.Combine({"84", [N_Limpos]})
        else if [Validação] = 8 and Text.Start([N_Limpos], 1) = "9"
        then Text.Combine({"849",[N_Limpos]})
        else if [Validação] = 8 and Text.Start([N_Limpos], 1) = "8"
        then Text.Combine({"849",[N_Limpos]})
        else if [Validação] = 8 and Text.Start([N_Limpos], 1) <> "9"
        then Text.Combine({"84",[N_Limpos]})
        else if [Validação] = 8 and Text.Start([N_Limpos], 1) <> "8"
        then Text.Combine({"84",[N_Limpos]})
        else if [Validação] = 13
        then Text.Combine({Text.Range([N_Limpos], 2, 2), Text.End([N_Limpos], 9)})
        else if [Validação] = 12 and Text.Start([N_Limpos], 1) <> "0"
        then Text.Combine({Text.Start([N_Limpos], 2), Text.End([N_Limpos], 9)})
        else if [Validação] = 12
        then Text.Combine({Text.Range([N_Limpos], 1, 2), Text.End([N_Limpos], 9)})
        else "-"),
    #"Adicionado ""Tipo de telefone""" = Table.AddColumn(#"Adicionado ""NumeroTelefone""", "TelefoneTipo", each if Text.Length([NumeroTelefone]) = 11
then "Celular"
else "Fixo"),
    #"Adicionado ""DDD""" = Table.AddColumn(#"Adicionado ""Tipo de telefone""", "DDD", each Text.Start([NumeroTelefone], 2), type text),
    #"Linhas Classificadas" = Table.Sort(#"Adicionado ""DDD""",{{"Nr seq contrato", Order.Ascending}, {"Carteira", Order.Ascending}, {"TelefoneTipo", Order.Ascending}}),
    #"Extraído ""Número do Telefone""" = Table.TransformColumns(#"Linhas Classificadas", {{"NumeroTelefone", each Text.Middle(_, 2, 9), type text}}),
    #"Duplicatas Removidas" = Table.Distinct(#"Extraído ""Número do Telefone""", {"Nr seq segurado", "Carteira", "Nr cpf"}),
    #"Colunas Renomeadas" = Table.RenameColumns(#"Duplicatas Removidas",{{"Nr seq segurado", "CodigoCliente"}, {"Nome", "ClienteNome"}}),
    #"Incluído ""Informação Adicional""" = Table.AddColumn(#"Colunas Renomeadas", "InfoAdicional", each "Resp. Financeiro: " & Text.Proper(Text.BeforeDelimiter([Pagador], " ", 0) & " " & Text.AfterDelimiter([Pagador], " ", {0, RelativePosition.FromEnd})) & ", Idade Beneficiário: " & [Idade em anos] & ", Carteira: " & [Carteira] & ", " & "Tipo de Contrato: " & [Tipo contratacao] & ", " & "Contrato: " & [Nr seq contrato]),
    #"Outras Colunas Removidas" = Table.SelectColumns(#"Incluído ""Informação Adicional""",{"Dt inclusao operadora","CodigoCliente", "TelefoneTipo", "DDD", "NumeroTelefone", "ClienteNome", "InfoAdicional"}),
    #"Retirado ""DD"" inválido" = Table.SelectRows(#"Outras Colunas Removidas", each ([DDD] <> "-")),
    #"Tipo Alterado" = Table.TransformColumnTypes(#"Retirado ""DD"" inválido",{{"Dt inclusao operadora", type date}, {"CodigoCliente", Int64.Type}, {"TelefoneTipo", type text}, {"DDD", Int64.Type}, {"NumeroTelefone", Int64.Type}, {"ClienteNome", type text}, {"InfoAdicional", type text}}),
    #"Classificado ""Data contratação""" = Table.Sort(#"Tipo Alterado",{{"Dt inclusao operadora", Order.Ascending}})
in
    #"Classificado ""Data contratação""";

shared Base_Mailing = let
    Fonte = Table.Combine({Cabeçalho_Mainling, Base_Contatos}),
    #"Tipo Alterado" = Table.TransformColumnTypes(Fonte,{{"CodigoCampanha", type text}, {"CodigoCliente", Int64.Type}, {"TelefoneTipo", type text}, {"DDD", Int64.Type}, {"NumeroTelefone", Int64.Type}, {"RamalAgendamento", type text}, {"DataAgendamento", type text}, {"ClienteNome", type text}, {"InfoAdicional", type text}}),
    #"Inserido ""Cód. Campanha""" = Table.ReplaceValue(#"Tipo Alterado",null,"23",Replacer.ReplaceValue,{"CodigoCampanha"})
in
    #"Inserido ""Cód. Campanha""";
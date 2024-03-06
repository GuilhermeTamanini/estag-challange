<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifique se os dados da tabela foram enviados
 
        // Acesse os dados da tabela
        $itens = $_POST["item"];
        $quantidades = $_POST["quantidade"];

        // Itere sobre os dados e faça o que for necessário (por exemplo, inserir no banco de dados)
        foreach ($itens as $indice => $item) {
            $quantidade = $quantidades[$indice];
            // Faça algo com $item e $quantidade (por exemplo, inserir no banco de dados)
        }

}
?>
<table>
    <thead>
        <tr>
            <th name="item">Item</th>
            <th name="quantidade">Quantidade</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td name="item">Item 1</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Item 2</td>
            <td>3</td>
        </tr>
        <!-- Mais linhas da tabela... -->
    </tbody>
</table>
<form action="teste.php" method="post">
    <button type="submit">Enviar</button>
</form>
</body>
</html>

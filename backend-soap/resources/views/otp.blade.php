<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Pago</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }
        .header {
            background-color: #004085;
            color: white;
            padding: 15px;
            border-radius: 8px;
        }
        h1 {
            font-size: 24px;
            margin: 0;
        }
        .content {
            margin-top: 30px;
            font-size: 18px;
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #004085;
            margin: 20px 0;
            padding: 10px;
            background-color: #e7f1ff;
            border-radius: 5px;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #004085;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Confirmación de Pago</h1>
        </div>
        <div class="content">
            <p>Estimado cliente, <strong>{{ $name }}</strong></p>
            <p class="otp">Tu código de verificación es: <strong>{{ $otp }}</strong></p>
            <p>Este código expirará en 15 minutos.</p>
        </div>
        <div class="footer">
            <p>Si no realizaste esta solicitud, por favor ignora este mensaje.</p>
        </div>
    </div>
</body>
</html>

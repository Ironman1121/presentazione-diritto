# Avvia il server Vite in una nuova finestra per vedere i log
Write-Host "Avvio del server Vite in una nuova finestra..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "In attesa che Vite sia pronto sulla porta 3000..." -ForegroundColor Yellow
$timeout = 30
$elapsed = 0
$ready = $false

while ($elapsed -lt $timeout) {
    if (Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet) {
        $ready = $true
        break
    }
    Start-Sleep -Seconds 2
    $elapsed += 2
    Write-Host "." -NoNewline
}

if ($ready) {
    Write-Host "`nServer Vite pronto! Avvio di ngrok..." -ForegroundColor Green
    # Avvia ngrok nello stesso terminale
    ngrok http --domain=fountainlike-unwholesomely-mellie.ngrok-free.dev 3000
} else {
    Write-Host "`nERRORE: Il server Vite non sembra essersi avviato sulla porta 3000 dopo $timeout secondi." -ForegroundColor Red
    Write-Host "Controlla la finestra di PowerShell appena aperta per eventuali errori." -ForegroundColor Red
}

# Script to download Microsoft 365 endpoints and extract Teams IP ranges
# Filters by ServiceArea = "Skype" and tcpPorts = "80,443"

param(
    [string]$OutputFormat = "CommaList" # Options: CommaList, Array, Json
)

# Data source URL
$endpointsUrl = "https://endpoints.office.com/endpoints/worldwide?clientrequestid=b10c5ed1-bad1-445f-b386-b919946339a7"

Write-Host "Downloading Microsoft 365 endpoints..." -ForegroundColor Cyan

try {
    # Download JSON data
    $endpoints = Invoke-RestMethod -Uri $endpointsUrl -Method Get -ErrorAction Stop
    
    Write-Host "Successfully downloaded $($endpoints.Count) endpoint definitions" -ForegroundColor Green
    
    # Filter for Microsoft Teams (Skype serviceArea with TCP ports 80,443 and has IPs property)
    $teamsEndpoint = $endpoints | Where-Object {
        $_.serviceArea -eq "Skype" -and $_.tcpPorts -eq "80,443" -and $_.ips
    }
    
    if (-not $teamsEndpoint) {
        Write-Host "ERROR: Could not find Microsoft Teams endpoint with serviceArea='Skype', tcpPorts='80,443', and IPs defined" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "`nFound Microsoft Teams endpoint (ID: $($teamsEndpoint.id))" -ForegroundColor Green
    Write-Host "Service Area Display Name: $($teamsEndpoint.serviceAreaDisplayName)" -ForegroundColor Gray
    
    # Separate IPv4 and IPv6 addresses
    $ipv4List = @()
    $ipv6List = @()
    
    foreach ($ip in $teamsEndpoint.ips) {
        if ($ip -match ":") {
            # IPv6 (contains colons)
            $ipv6List += $ip
        } else {
            # IPv4
            $ipv4List += $ip
        }
    }
    
    # Output results
    Write-Host "`n================================" -ForegroundColor Cyan
    Write-Host "RESULTS" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    
    Write-Host "`nIPv4 Ranges ($($ipv4List.Count) total):" -ForegroundColor Yellow
    $ipv4String = $ipv4List -join ","
    Write-Host $ipv4String -ForegroundColor White
    
    Write-Host "`nIPv6 Ranges ($($ipv6List.Count) total):" -ForegroundColor Yellow
    $ipv6String = $ipv6List -join ","
    Write-Host $ipv6String -ForegroundColor White
    
    # Export to variables for easy use
    Write-Host "`n================================" -ForegroundColor Cyan
    Write-Host "EXPORT VARIABLES" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    
    # Create output object
    $result = [PSCustomObject]@{
        IPv4CommaList = $ipv4String
        IPv6CommaList = $ipv6String
        IPv4Array = $ipv4List
        IPv6Array = $ipv6List
        TotalIPv4 = $ipv4List.Count
        TotalIPv6 = $ipv6List.Count
        ServiceAreaDisplayName = $teamsEndpoint.serviceAreaDisplayName
        EndpointId = $teamsEndpoint.id
        LastUpdated = Get-Date
    }

    
    # Return the result object
    return $result
    
} catch {
    Write-Host "ERROR: Failed to download or parse endpoints" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

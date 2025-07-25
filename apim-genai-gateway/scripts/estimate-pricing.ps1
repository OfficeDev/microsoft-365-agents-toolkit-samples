# Azure GenAI Gateway Pricing Calculator
# This script estimates the costs for deploying the GenAI Gateway infrastructure

param(
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("Basic", "BasicV2", "Consumption", "Developer", "Isolated", "Premium", "Standard", "StandardV2")]
    [string]$ApimSku = "Basic",
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("F0", "S0")]
    [string]$AiServicesSku = "S0",
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("F0", "S0")]
    [string]$ContentSafetySku = "S0",
    
    [Parameter(Mandatory=$false)]
    [bool]$EnableContentSafety = $false,
    
    [Parameter(Mandatory=$false)]
    [int]$EstimatedHourlyTokens = 137,  # Default: ~100K monthly ÷ 730 hours
    
    [Parameter(Mandatory=$false)]
    [string]$Currency = "USD"
)

# Color coding for output
function Write-ColoredText {
    param($Text, $Color)
    Write-Host $Text -ForegroundColor $Color
}

function Write-SectionHeader {
    param($Text)
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Cyan
    Write-Host $Text -ForegroundColor Yellow
    Write-Host ("=" * 60) -ForegroundColor Cyan
}

function Write-SubHeader {
    param($Text)
    Write-Host ""
    Write-Host $Text -ForegroundColor Green
    Write-Host ("-" * 40) -ForegroundColor Green
}

# Pricing data (as of 2025 - should be updated regularly)
# Note: Monthly costs are converted to hourly by dividing by 730 hours/month
$PricingData = @{
    ApiManagement = @{
        Basic = @{ Hourly = [math]::Round(182.50 / 730, 4); Calls = 100000; Description = "100K calls/unit, 2 units max" }
        BasicV2 = @{ Hourly = [math]::Round(185.00 / 730, 4); Calls = 100000; Description = "100K calls/unit, improved performance" }
        Consumption = @{ Hourly = 0; Calls = 0; Description = "Pay-per-call serverless tier (~$0.0035 per call)" }
        Developer = @{ Hourly = [math]::Round(56.93 / 730, 4); Calls = 1000000; Description = "1M calls, 1 unit, no SLA" }
        Isolated = @{ Hourly = [math]::Round(750.00 / 730, 4); Calls = 250000; Description = "250K calls/unit, dedicated infrastructure" }
        Premium = @{ Hourly = [math]::Round(2920.00 / 730, 4); Calls = 250000; Description = "250K calls/unit, 12 units max, multi-region" }
        Standard = @{ Hourly = [math]::Round(292.00 / 730, 4); Calls = 250000; Description = "250K calls/unit, 4 units max" }
        StandardV2 = @{ Hourly = [math]::Round(295.00 / 730, 4); Calls = 250000; Description = "250K calls/unit, improved performance" }
    }
    
    AiServices = @{
        F0 = @{ Hourly = 0; Description = "Free tier - 20 RPM, 40K tokens/month limit" }
        S0 = @{ Hourly = 0; Description = "Standard tier - Pay per token, no limits" }
    }
    
    Models = @{
        "gpt-4o" = @{
            InputCostPer1KTokens = 0.0025
            OutputCostPer1KTokens = 0.01
            CapacityUnits = 10
        }
        "text-embedding-ada-002" = @{
            InputCostPer1KTokens = 0.0001
            OutputCostPer1KTokens = 0.0001
            CapacityUnits = 10
        }
    }
    
    AdditionalServices = @{
        Redis = @{ BasicHourly = [math]::Round(16.06 / 730, 4); StandardHourly = [math]::Round(55.00 / 730, 4); PremiumHourly = [math]::Round(183.00 / 730, 4) }
        LogAnalytics = @{ PerGB = 2.30 }
        ApplicationInsights = @{ PerGB = 2.30 }
        ContentSafety = @{ F0 = 0; S0_Per1KTransactions = 1.00 }
    }
}

Write-SectionHeader "Azure GenAI Gateway - Hourly Cost Estimation"

Write-ColoredText "Configuration:" White
Write-Host "  Location: $Location"
Write-Host "  API Management SKU: $ApimSku"
Write-Host "  AI Services SKU: $AiServicesSku"
Write-Host "  Content Safety SKU: $ContentSafetySku"
Write-Host "  Content Safety Enabled: $EnableContentSafety"
Write-Host "  Estimated Hourly Tokens: $($EstimatedHourlyTokens.ToString('N0'))"
Write-Host "  Currency: $Currency"

Write-SubHeader "Core Infrastructure Costs"

# API Management
if ($ApimSku -eq "Consumption") {
    $apimCost = 0  # Will be calculated separately based on usage
    Write-Host "  API Management ($ApimSku): Pay-per-call pricing"
    Write-Host "    Features: $($PricingData.ApiManagement[$ApimSku].Description)"
} else {
    $apimCost = $PricingData.ApiManagement[$ApimSku].Hourly
    Write-Host "  API Management ($ApimSku): `$$($apimCost.ToString('F4'))/hour"
    Write-Host "    Features: $($PricingData.ApiManagement[$ApimSku].Description)"
}

# AI Services (2 instances)
$aiServiceCost = $PricingData.AiServices[$AiServicesSku].Hourly * 2
Write-Host "  AI Services (2x $AiServicesSku): `$$($aiServiceCost.ToString('F4'))/hour (base)"
Write-Host "    Note: $($PricingData.AiServices[$AiServicesSku].Description)"

# Redis Cache
$redisCost = $PricingData.AdditionalServices.Redis.BasicHourly
Write-Host "  Azure Cache for Redis (Basic C0): `$$($redisCost.ToString('F4'))/hour"

# Monitoring
$monitoringCost = [math]::Round(10 / 730, 4)  # Estimated for basic monitoring, converted to hourly
Write-Host "  Monitoring (Log Analytics + App Insights): ~`$$($monitoringCost.ToString('F4'))/hour"

# Content Safety
if ($EnableContentSafety) {
    if ($ContentSafetySku -eq "F0") {
        $contentSafetyCost = 0
        Write-Host "  Content Safety (F0): `$0/hour (free tier)"
    } else {
        $contentSafetyCost = 0  # Pay per use
        Write-Host "  Content Safety (S0): Pay per use (`$1.00 per 1K transactions)"
    }
} else {
    $contentSafetyCost = 0
    Write-Host "  Content Safety: Disabled (`$0)"
}

Write-SubHeader "Usage-Based Costs (Token Consumption)"

# Calculate token costs
$gpt4oInputTokens = [math]::Floor($EstimatedHourlyTokens * 0.75)  # 75% input
$gpt4oOutputTokens = [math]::Floor($EstimatedHourlyTokens * 0.25)  # 25% output
$embeddingTokens = [math]::Floor($EstimatedHourlyTokens * 0.1)     # 10% for embeddings

$gpt4oInputCost = ($gpt4oInputTokens / 1000) * $PricingData.Models["gpt-4o"].InputCostPer1KTokens * 2  # 2 services
$gpt4oOutputCost = ($gpt4oOutputTokens / 1000) * $PricingData.Models["gpt-4o"].OutputCostPer1KTokens * 2  # 2 services
$embeddingCost = ($embeddingTokens / 1000) * $PricingData.Models["text-embedding-ada-002"].InputCostPer1KTokens * 2  # 2 services

Write-Host "  GPT-4o Input ($($gpt4oInputTokens.ToString('N0')) tokens across 2 services): `$$($gpt4oInputCost.ToString('F4'))"
Write-Host "  GPT-4o Output ($($gpt4oOutputTokens.ToString('N0')) tokens across 2 services): `$$($gpt4oOutputCost.ToString('F4'))"
Write-Host "  Embeddings ($($embeddingTokens.ToString('N0')) tokens across 2 services): `$$($embeddingCost.ToString('F4'))"

$totalUsageCost = $gpt4oInputCost + $gpt4oOutputCost + $embeddingCost

Write-SubHeader "Total Cost Summary"

$totalBaseCost = $apimCost + $aiServiceCost + $redisCost + $monitoringCost + $contentSafetyCost
$totalEstimatedCost = $totalBaseCost + $totalUsageCost

Write-ColoredText "  Base Infrastructure Cost: `$$($totalBaseCost.ToString('F4'))/hour" Cyan
if ($ApimSku -eq "Consumption") {
    Write-ColoredText "  Note: APIM Consumption tier costs not included (pay-per-call)" Yellow
}
Write-ColoredText "  Estimated Usage Cost: `$$($totalUsageCost.ToString('F4'))/hour" Cyan
Write-ColoredText "  TOTAL ESTIMATED COST: `$$($totalEstimatedCost.ToString('F4'))/hour" Yellow

# Show daily equivalent for reference
$dailyEquivalent = $totalEstimatedCost * 24
Write-Host ""
Write-Host "  Daily equivalent (24 hours): `$$($dailyEquivalent.ToString('F2'))/day` "

# Show monthly equivalent for reference
# $monthlyEquivalent = $totalEstimatedCost * 730
# Write-Host ""
# Write-ColoredText "  Monthly equivalent (730 hours): `$$($monthlyEquivalent.ToString('F2'))/month" Gray

Write-SubHeader "Cost Optimization Recommendations"

if ($ApimSku -eq "Premium" -or $ApimSku -eq "Isolated") {
    $devHourly = $PricingData.ApiManagement["Developer"].Hourly
    $stdHourly = $PricingData.ApiManagement["Standard"].Hourly
    Write-ColoredText "  ⚠️  Consider starting with Developer (`$$($devHourly.ToString('F4'))/hour) or Standard (`$$($stdHourly.ToString('F4'))/hour) for testing" Yellow
}

if ($ApimSku -eq "Consumption") {
    Write-ColoredText "  💡 Consumption tier is pay-per-call (~$0.0035 per call). Cost-effective for low traffic." Green
    $estimatedConsumptionCost = ($EstimatedHourlyTokens / 1000) * 0.0035 * 2  # Rough estimate
    Write-ColoredText "     Estimated consumption cost: ~`$$($estimatedConsumptionCost.ToString('F4'))/hour" Cyan
}

if ($AiServicesSku -eq "S0" -and $EstimatedHourlyTokens -lt 55) {  # 40K/730 hours ≈ 55 tokens/hour
    Write-ColoredText "  💡 Consider F0 (Free) tier for development - supports up to 55 tokens/hour (~40K tokens/month)" Green
}

if ($EstimatedHourlyTokens -gt 13699) {  # 10M/730 hours ≈ 13,699 tokens/hour
    Write-ColoredText "  📊 High usage detected - monitor costs closely and consider implementing:" Yellow
    Write-Host "     • Stricter token limits in APIM policies"
    Write-Host "     • Enhanced semantic caching"
    Write-Host "     • Request filtering and optimization"
}

Write-Host ""
Write-ColoredText "📝 For precise regional pricing, visit: https://azure.microsoft.com/pricing/calculator/" Magenta

Write-Host ""
Write-ColoredText "💰 Remember: Actual costs may vary based on region, exact usage patterns, and current Azure pricing." White
Write-ColoredText "⏱️  All costs shown are hourly rates. Multiply by hours of usage for total cost estimation." White
Write-ColoredText "🔑 Post-deployment: Run .\get-api-key-quick.ps1 to retrieve your API Management subscription key." Cyan

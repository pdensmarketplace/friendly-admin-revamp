package com.cockpit.model

data class DashboardData(
    val totalCustomers: Int = 45231,
    val customerGrowth: Double = 20.1,
    val premiumSubscribers: Int = 12345,
    val subscriberGrowth: Double = 15.3,
    val supportTickets: Int = 89,
    val ticketChange: Double = -5.2,
    val serviceCalls: Int = 234,
    val callsGrowth: Double = 12.5
)

data class RevenueData(
    val month: String,
    val total: Double
)

data class CustomerGrowthData(
    val month: String,
    val customers: Int
)
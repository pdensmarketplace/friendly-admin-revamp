package com.cockpit.controller

import com.cockpit.model.DashboardData
import com.cockpit.model.RevenueData
import com.cockpit.model.CustomerGrowthData
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class DashboardController {

    @GetMapping("/dashboard")
    fun dashboard(model: Model): String {
        val dashboardData = DashboardData()
        
        val revenueData = listOf(
            RevenueData("Jan", 2400.0),
            RevenueData("Feb", 3600.0),
            RevenueData("Mar", 3200.0),
            RevenueData("Apr", 4500.0),
            RevenueData("May", 4200.0),
            RevenueData("Jun", 5200.0),
            RevenueData("Jul", 5800.0)
        )
        
        val customerGrowthData = listOf(
            CustomerGrowthData("Jan", 2400),
            CustomerGrowthData("Feb", 3600),
            CustomerGrowthData("Mar", 3200),
            CustomerGrowthData("Apr", 4500),
            CustomerGrowthData("May", 4200),
            CustomerGrowthData("Jun", 5200),
            CustomerGrowthData("Jul", 5800)
        )

        model.addAttribute("dashboardData", dashboardData)
        model.addAttribute("revenueData", revenueData)
        model.addAttribute("customerGrowthData", customerGrowthData)
        
        return "dashboard/index"
    }
}
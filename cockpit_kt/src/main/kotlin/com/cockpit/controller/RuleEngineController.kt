package com.cockpit.controller

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/rule-engine")
class RuleEngineController {

    @GetMapping("/rules")
    fun getRules(): List<RuleEngineData> {
        // Mock data for now
        return listOf(
            RuleEngineData(
                id = 1,
                name = "Daily Commission Rule",
                type = "commission",
                frequency = "daily",
                status = "active"
            ),
            RuleEngineData(
                id = 2,
                name = "Premium Customer Loyalty",
                type = "loyalty",
                frequency = "weekly",
                status = "active"
            )
        )
    }

    @PostMapping("/verify")
    fun verifyRule(@RequestBody testData: Map<String, Any>): Map<String, Any> {
        // Mock verification response
        return mapOf(
            "success" to true,
            "message" to "Rule verified successfully"
        )
    }
}
package com.cockpit.model

data class PriceSlab(
    val from: Int = 0,
    val to: Int = 0,
    val price: Double = 0.0
)

data class Resource(
    val type: String = "",
    val amount: Int = 0,
    val unit: String = "",
    val jump: Int = 0,
    val priceSlabs: List<PriceSlab> = emptyList()
)

data class ValidityPeriod(
    val duration: Int = 0,
    val resources: List<Resource> = emptyList()
)

data class BYOPPackage(
    val id: String = "",
    val name: String = "",
    val type: String = "",
    val status: String = "",
    val validityPeriods: List<ValidityPeriod> = emptyList()
)
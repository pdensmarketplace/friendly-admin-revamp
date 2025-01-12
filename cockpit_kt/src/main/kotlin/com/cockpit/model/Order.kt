package com.cockpit.model

import java.time.LocalDateTime
import java.math.BigDecimal

data class Order(
    val id: String,
    val customerName: String,
    val orderDate: LocalDateTime,
    val status: OrderStatus,
    val total: BigDecimal,
    val items: List<OrderItem>
)

data class OrderItem(
    val id: String,
    val productName: String,
    val quantity: Int,
    val price: BigDecimal
)

enum class OrderStatus {
    PENDING,
    PROCESSING,
    COMPLETED,
    CANCELLED
}
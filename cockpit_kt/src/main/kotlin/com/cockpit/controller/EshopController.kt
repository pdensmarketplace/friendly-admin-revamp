package com.cockpit.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*
import com.cockpit.model.*
import java.time.LocalDateTime
import java.math.BigDecimal

@Controller
@RequestMapping("/e-shop")
class EshopController {
    
    // Temporary in-memory storage (replace with database later)
    private val orders = mutableListOf(
        Order(
            id = "ORD-001",
            customerName = "John Doe",
            orderDate = LocalDateTime.now().minusDays(1),
            status = OrderStatus.COMPLETED,
            total = BigDecimal("299.99"),
            items = listOf(
                OrderItem(
                    id = "ITEM-001",
                    productName = "Premium Widget",
                    quantity = 2,
                    price = BigDecimal("149.99")
                )
            )
        ),
        Order(
            id = "ORD-002",
            customerName = "Jane Smith",
            orderDate = LocalDateTime.now().minusHours(3),
            status = OrderStatus.PENDING,
            total = BigDecimal("89.99"),
            items = listOf(
                OrderItem(
                    id = "ITEM-002",
                    productName = "Basic Widget",
                    quantity = 1,
                    price = BigDecimal("89.99")
                )
            )
        )
    )

    @GetMapping("/orders")
    fun getOrders(model: Model): String {
        model.addAttribute("orders", orders)
        return "eshop/orders"
    }

    @PostMapping("/orders/{orderId}/status")
    @ResponseBody
    fun updateOrderStatus(
        @PathVariable orderId: String,
        @RequestParam newStatus: OrderStatus
    ): Map<String, String> {
        val order = orders.find { it.id == orderId }
        if (order != null) {
            val updatedOrder = order.copy(status = newStatus)
            orders.replaceAll { if (it.id == orderId) updatedOrder else it }
            return mapOf("status" to "success")
        }
        return mapOf("status" to "error", "message" to "Order not found")
    }
}
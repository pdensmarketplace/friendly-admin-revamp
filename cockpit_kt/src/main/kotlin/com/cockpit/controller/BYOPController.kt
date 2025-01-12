package com.cockpit.controller

import com.cockpit.model.BYOPPackage
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*

@Controller
@RequestMapping("/byop")
class BYOPController {
    
    private val packages = mutableListOf<BYOPPackage>()

    @GetMapping
    fun showBYOPPage(model: Model): String {
        model.addAttribute("packages", packages)
        return "byop/index"
    }

    @PostMapping("/save")
    @ResponseBody
    fun savePackage(@RequestBody byopPackage: BYOPPackage): BYOPPackage {
        packages.add(byopPackage)
        return byopPackage
    }

    @GetMapping("/packages")
    @ResponseBody
    fun getPackages(): List<BYOPPackage> = packages
}
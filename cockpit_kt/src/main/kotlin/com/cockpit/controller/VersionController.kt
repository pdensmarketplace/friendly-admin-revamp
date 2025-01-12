package com.cockpit.controller

import com.cockpit.model.Version
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*

@Controller
@RequestMapping("/versions")
class VersionController {

    private val versions = mutableListOf<Version>()

    @GetMapping("")
    fun index(model: Model): String {
        model.addAttribute("versions", versions)
        return "versions/index"
    }

    @PostMapping("")
    @ResponseBody
    fun create(@RequestBody version: Version): Version {
        versions.add(version)
        return version
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    fun delete(@PathVariable id: Long): Map<String, Boolean> {
        versions.removeIf { it.id == id }
        return mapOf("success" to true)
    }
}
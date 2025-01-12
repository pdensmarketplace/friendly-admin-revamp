package com.cockpit.controller

import com.cockpit.model.Version
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*

@Controller
@RequestMapping("/versions")
class VersionController {
    
    private val versions = mutableListOf(
        Version(33, "ios", "sc_app", "1.0.0", "sc_app_theme"),
        Version(26, "web", "sc_flutter_web", "1.0.0", "flutter_web_theme_zn"),
        Version(27, "android", "sc_app", "1.1.0", "android_theme"),
        Version(28, "ios", "sc_flutter_web", "2.0.0", "ios_theme_v2"),
        Version(29, "web", "sc_app", "1.2.0", "web_theme_latest")
    )

    @GetMapping
    fun showVersions(model: Model): String {
        model.addAttribute("versions", versions)
        return "versions/index"
    }

    @PostMapping
    @ResponseBody
    fun addVersion(@RequestBody version: Version): Version {
        versions.add(version)
        return version
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    fun deleteVersion(@PathVariable id: Long): Map<String, Boolean> {
        versions.removeIf { it.id == id }
        return mapOf("success" to true)
    }
}
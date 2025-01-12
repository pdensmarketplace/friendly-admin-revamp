package com.cockpit.model

data class Version(
    val id: Long,
    val platform: String,
    val channel: String,
    val versionNumber: String,
    val themeName: String
)
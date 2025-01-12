package com.cockpit.model

import jakarta.persistence.*

@Entity
@Table(name = "versions")
data class Version(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    
    @Column(nullable = false)
    var platform: String,
    
    @Column(nullable = false)
    var channel: String,
    
    @Column(name = "version_number", nullable = false)
    var versionNumber: String,
    
    @Column(name = "theme_name", nullable = false)
    var themeName: String
)
<?php
/**
 * Block Patterns
 *
 * @package MDPorto
 */

/**
 * Register Block Pattern Category.
 */
function mdporto_register_block_pattern_categories() {
    register_block_pattern_category(
        'mdporto',
        array( 'label' => esc_html__( 'MDPorto', 'mdporto' ) )
    );
}
add_action( 'init', 'mdporto_register_block_pattern_categories' );

/**
 * Register Block Patterns.
 */
function mdporto_register_block_patterns() {
    // Hero Developer Section
    $hero_content = file_exists( get_template_directory() . '/parts/sections/hero-developer.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/hero-developer.html' ) 
        : '<!-- Hero section file not found -->';
        
    register_block_pattern(
        'mdporto/hero-developer',
        array(
            'title'       => esc_html__( 'Hero Developer Section', 'mdporto' ),
            'description' => esc_html__( 'A hero section with gradient background, developer information, and animated typing text.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $hero_content,
        )
    );

    // About Section
    $about_content = file_exists( get_template_directory() . '/parts/sections/about.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/about.html' ) 
        : '<!-- About section file not found -->';
        
    register_block_pattern(
        'mdporto/about-section',
        array(
            'title'       => esc_html__( 'About Section', 'mdporto' ),
            'description' => esc_html__( 'An about section with background shapes, profile image, and experience badge.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $about_content,
        )
    );

    // Services Section
    $services_content = file_exists( get_template_directory() . '/parts/sections/services.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/services.html' ) 
        : '<!-- Services section file not found -->';
        
    register_block_pattern(
        'mdporto/services-section',
        array(
            'title'       => esc_html__( 'Services Section', 'mdporto' ),
            'description' => esc_html__( 'A services section with SVG icons, service descriptions, and a CTA card.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $services_content,
        )
    );

    // Fastwork CTA Section
    $fastwork_content = file_exists( get_template_directory() . '/parts/sections/fastwork-cta.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/fastwork-cta.html' ) 
        : '<!-- Fastwork CTA section file not found -->';
        
    register_block_pattern(
        'mdporto/fastwork-cta-section',
        array(
            'title'       => esc_html__( 'Fastwork CTA Section', 'mdporto' ),
            'description' => esc_html__( 'A call-to-action section for Fastwork freelancer profile with rating stars.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $fastwork_content,
        )
    );

    // Portfolio Section
    $portfolio_content = file_exists( get_template_directory() . '/parts/sections/portfolio.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/portfolio.html' ) 
        : '<!-- Portfolio section file not found -->';
        
    register_block_pattern(
        'mdporto/portfolio-section',
        array(
            'title'       => esc_html__( 'Portfolio Section', 'mdporto' ),
            'description' => esc_html__( 'A portfolio section with gradient background and portfolio grid.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $portfolio_content,
        )
    );

    // Testimonials Section
    $testimonials_content = file_exists( get_template_directory() . '/parts/sections/testimonials.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/testimonials.html' ) 
        : '<!-- Testimonials section file not found -->';
        
    register_block_pattern(
        'mdporto/testimonials-section',
        array(
            'title'       => esc_html__( 'Testimonials Section', 'mdporto' ),
            'description' => esc_html__( 'A testimonials section with testimonial slider.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $testimonials_content,
        )
    );

    // Contact Section
    $contact_content = file_exists( get_template_directory() . '/parts/sections/contact.html' ) 
        ? file_get_contents( get_template_directory() . '/parts/sections/contact.html' ) 
        : '<!-- Contact section file not found -->';
        
    register_block_pattern(
        'mdporto/contact-section',
        array(
            'title'       => esc_html__( 'Contact Section', 'mdporto' ),
            'description' => esc_html__( 'A modern contact section with contact information card and form fields.', 'mdporto' ),
            'categories'  => array( 'mdporto' ),
            'content'     => $contact_content,
        )
    );
}

add_action( 'init', 'mdporto_register_block_patterns' );

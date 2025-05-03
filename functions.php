<?php
/**
 * MDPorto functions and definitions
 *
 * @package MDPorto
 * @since 1.0.0
 */

if ( ! function_exists( 'mdporto_setup' ) ) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    function mdporto_setup() {
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'wp-block-styles' );
        add_theme_support( 'editor-styles' );
        add_editor_style( 'style.css' );
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'custom-units' );
        add_theme_support( 'custom-line-height' );
        add_theme_support( 'experimental-link-color' );

        add_theme_support( 'block-templates' );
        add_theme_support( 'block-template-parts' );

        register_nav_menus(
            array(
                'primary' => esc_html__( 'Primary menu', 'mdporto' ),
                'footer'  => esc_html__( 'Footer menu', 'mdporto' ),
                'social'  => esc_html__( 'Social menu', 'mdporto' ),
            )
        );
    }
}
add_action( 'after_setup_theme', 'mdporto_setup' );

/**
 * Enqueue scripts and styles.
 */
function mdporto_scripts() {
    wp_enqueue_style( 'mdporto-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-style', get_stylesheet_uri(), array('mdporto-fonts'), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-header', get_template_directory_uri() . '/assets/css/header.css', array('mdporto-fonts'), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_style( 'mdporto-animations', get_template_directory_uri() . '/assets/css/animations.css', array('mdporto-fonts'), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_style( 'mdporto-components', get_template_directory_uri() . '/assets/css/components.css', array('mdporto-fonts'), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_style( 'mdporto-illustrations', get_template_directory_uri() . '/assets/css/illustrations.css', array('mdporto-fonts'), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-archive-custom', get_template_directory_uri() . '/assets/css/archive-custom.css', array(), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_style( 'mdporto-single-custom', get_template_directory_uri() . '/assets/css/single-custom.css', array(), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_style( 'mdporto-portfolio-custom', get_template_directory_uri() . '/assets/css/portfolio-custom.css', array(), wp_get_theme()->get( 'Version' ) . '.' . time() );
    wp_enqueue_script( 'mdporto-header', get_template_directory_uri() . '/assets/js/header.js', array(), wp_get_theme()->get( 'Version' ), true );
    wp_enqueue_script( 'mdporto-animations', get_template_directory_uri() . '/assets/js/animations.js', array(), wp_get_theme()->get( 'Version' ), true );
    wp_enqueue_script( 'mdporto-components', get_template_directory_uri() . '/assets/js/components.js', array(), wp_get_theme()->get( 'Version' ), true );
    wp_enqueue_script( 'mdporto-network-animation', get_template_directory_uri() . '/assets/js/network-animation.js', array(), wp_get_theme()->get( 'Version' ), true );
}

add_action( 'wp_enqueue_scripts', 'mdporto_scripts' );



/**
 * Enqueue styles for both frontend and editor.
 */
function mdporto_block_assets() {
    wp_enqueue_style( 'mdporto-fonts', get_template_directory_uri() . '/assets/css/fonts.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-header', get_template_directory_uri() . '/assets/css/header.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-components', get_template_directory_uri() . '/assets/css/components.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'mdporto-illustrations', get_template_directory_uri() . '/assets/css/illustrations.css', array(), wp_get_theme()->get( 'Version' ) );
    if (file_exists(get_template_directory() . '/assets/js/components.js')) {
        wp_enqueue_script( 'mdporto-components-js', get_template_directory_uri() . '/assets/js/components.js', array('jquery'), wp_get_theme()->get( 'Version' ), true );
    }
    if (file_exists(get_template_directory() . '/assets/js/animations.js')) {
        wp_enqueue_script( 'mdporto-animations-js', get_template_directory_uri() . '/assets/js/animations.js', array('jquery'), wp_get_theme()->get( 'Version' ), true );
    }
    if (file_exists(get_template_directory() . '/assets/js/network-animation.js')) {
        wp_enqueue_script( 'mdporto-network-animation-js', get_template_directory_uri() . '/assets/js/network-animation.js', array('jquery'), wp_get_theme()->get( 'Version' ), true );
    }
}

add_action( 'enqueue_block_assets', 'mdporto_block_assets' );

/**
 * Enqueue styles and scripts for the editor only.
 */
function mdporto_block_editor_assets() {
    if (file_exists(get_template_directory() . '/assets/css/editor-styles.css')) {
        wp_enqueue_style( 'mdporto-editor-styles', get_template_directory_uri() . '/assets/css/editor-styles.css', array(), wp_get_theme()->get( 'Version' ) );
    }
    
    if (file_exists(get_template_directory() . '/assets/js/editor.js')) {
        wp_enqueue_script( 'mdporto-editor-js', get_template_directory_uri() . '/assets/js/editor.js', array('jquery', 'wp-blocks', 'wp-element'), wp_get_theme()->get( 'Version' ), true );
    }
}
add_action( 'enqueue_block_editor_assets', 'mdporto_block_editor_assets' );

/**
 * Allow SVG uploads
 */
function mdporto_allow_svg_upload( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['svgz'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'mdporto_allow_svg_upload' );

/**
 * Fix SVG display in Media Library
 */
function mdporto_fix_svg_display( $response ) {
    if ( $response['mime'] === 'image/svg+xml' ) {
        $response['sizes'] = array(
            'full' => array(
                'url' => $response['url'],
                'width' => $response['width'],
                'height' => $response['height'],
            ),
        );
    }
    return $response;
}
add_filter( 'wp_prepare_attachment_for_js', 'mdporto_fix_svg_display' );

/**
 * Add SVG to allowed mime types for security
 */
function mdporto_allow_svg_in_rest( $mime_types ) {
    $mime_types['svg'] = 'image/svg+xml';
    $mime_types['svgz'] = 'image/svg+xml';
    return $mime_types;
}
add_filter( 'rest_mime_types', 'mdporto_allow_svg_in_rest' );

/**
 * Add block patterns.
 */
require get_template_directory() . '/inc/block-patterns.php';

/**
 * Register Portfolio Custom Post Type
 */
function mdporto_register_portfolio_post_type() {
    
}
add_action( 'init', 'mdporto_register_portfolio_post_type' );

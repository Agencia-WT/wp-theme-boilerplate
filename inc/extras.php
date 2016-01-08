<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package wp-theme-boilerplate
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function wp_theme_boilerplate_body_classes($classes)
{
    // Adds a class of group-blog to blogs with more than 1 published author.
    if (is_multi_author()) {
        $classes[] = 'group-blog';
    }

    return $classes;
}

add_filter('body_class', 'wp_theme_boilerplate_body_classes');


add_filter('pre_get_document_title', 'wp_boilerplate_custom_titles', 100);

function wp_theme_boilerplate_custom_title($title)
{
    global $post;

    if (is_single() || is_page()) {
        $title = get_the_title($post->ID) . ' | ' . get_bloginfo('title', 'display');
    }

    return $title;
}

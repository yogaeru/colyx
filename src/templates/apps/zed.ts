export function templateZed() {
  return `{
  "$schema": "https://zed.dev/schema/themes/v1.json",
  "name": "Matugen",
  "author": "matugen",
  "themes": [
    {
      "name": "Matugen Dark",
      "appearance": "dark",
      "style": {
        "accents": [
          "{{colors.primary.dark.hex}}",
          "{{colors.secondary.dark.hex}}",
          "{{colors.tertiary.dark.hex}}",
          "{{colors.error.dark.hex}}",
          "{{colors.success.dark.hex}}"
        ],
        "background.appearance": "opaque",
        "border": "{{colors.outline_variant.dark.hex}}",
        "border.variant": "{{colors.outline.dark.hex}}",
        "border.focused": "{{colors.primary.dark.hex}}",
        "border.selected": "{{colors.primary.dark.hex}}",
        "border.transparent": "transparent",
        "border.disabled": "{{colors.outline_variant.dark.hex}}",
        "elevated_surface.background": "{{colors.surface_container_high.dark.hex}}",
        "surface.background": "{{colors.surface.dark.hex}}",
        "background": "{{colors.surface.dark.hex}}",
        "element.background": "{{colors.surface_bright.dark.hex}}",
        "element.hover": "{{colors.surface_container_low.dark.hex}}",
        "element.active": "{{colors.surface_container_high.dark.hex}}",
        "element.selected": "{{colors.primary_container.dark.hex}}",
        "element.disabled": "{{colors.surface_container_low.dark.hex}}",
        "drop_target.background": "{{colors.primary_container.dark.hex}}",
        "ghost_element.background": "transparent",
        "ghost_element.hover": "{{colors.surface_container_low.dark.hex}}",
        "ghost_element.active": "{{colors.surface_container_high.dark.hex}}",
        "ghost_element.selected": "{{colors.primary_container.dark.hex}}",
        "ghost_element.disabled": "transparent",
        "text": "{{colors.on_surface.dark.hex}}",
        "text.muted": "{{colors.on_surface_variant.dark.hex}}",
        "text.placeholder": "{{colors.on_surface_variant.dark.hex}}",
        "text.disabled": "{{colors.outline.dark.hex}}",
        "text.accent": "{{colors.primary.dark.hex}}",
        "icon": "{{colors.on_surface.dark.hex}}",
        "icon.muted": "{{colors.on_surface_variant.dark.hex}}",
        "icon.disabled": "{{colors.outline.dark.hex}}",
        "icon.placeholder": "{{colors.outline_variant.dark.hex}}",
        "icon.accent": "{{colors.primary.dark.hex}}",
        "status_bar.background": "{{colors.surface.dark.hex}}",
        "title_bar.background": "{{colors.surface.dark.hex}}",
        "title_bar.inactive_background": "{{colors.surface.dark.hex}}",
        "toolbar.background": "{{colors.surface.dark.hex}}",
        "tab_bar.background": "{{colors.surface.dark.hex}}",
        "tab.inactive_background": "{{colors.surface.dark.hex}}",
        "tab.active_background": "{{colors.surface_bright.dark.hex}}",
        "search.match_background": "{{colors.tertiary_container.dark.hex}}",
        "panel.background": "{{colors.surface.dark.hex}}",
        "panel.focused_border": "{{colors.primary.dark.hex}}",
        "pane.focused_border": "{{colors.primary.dark.hex}}",
        "scrollbar.thumb.background": "{{colors.outline_variant.dark.hex}}",
        "scrollbar.thumb.hover_background": "{{colors.outline.dark.hex}}",
        "scrollbar.thumb.border": "transparent",
        "scrollbar.track.background": "transparent",
        "scrollbar.track.border": "transparent",
        "editor.foreground": "{{colors.on_surface.dark.hex}}",
        "editor.background": "{{colors.surface.dark.hex}}",
        "editor.gutter.background": "{{colors.surface.dark.hex}}",
        "editor.subheader.background": "{{colors.surface_bright.dark.hex}}",
        "editor.indent_guide": "{{colors.outline_variant.dark.hex}}",
        "editor.indent_guide_active": "{{colors.outline.dark.hex}}",
        "editor.active_line.background": "{{colors.surface_bright.dark.hex}}",
        "editor.highlighted_line.background": "{{colors.surface_container_low.dark.hex}}",
        "editor.line_number": "{{colors.on_surface_variant.dark.hex}}",
        "editor.active_line_number": "{{colors.on_surface.dark.hex}}",
        "editor.invisible": "{{colors.outline_variant.dark.hex}}",
        "editor.wrap_guide": "{{colors.outline_variant.dark.hex}}",
        "editor.active_wrap_guide": "{{colors.outline.dark.hex}}",
        "editor.document_highlight.read_background": "{{colors.primary_container.dark.hex}}",
        "editor.document_highlight.write_background": "{{colors.secondary_container.dark.hex}}",
        "terminal.background": "{{colors.surface.dark.hex}}",
        "terminal.foreground": "{{colors.on_surface.dark.hex}}",
        "terminal.bright_foreground": "{{colors.on_surface.dark.hex}}",
        "terminal.dim_foreground": "{{colors.on_surface_variant.dark.hex}}",
        "terminal.ansi.black": "{{colors.surface.dark.hex}}",
        "terminal.ansi.bright_black": "{{colors.surface_container_high.dark.hex}}",
        "terminal.ansi.dim_black": "{{colors.surface_container_low.dark.hex}}",
        "terminal.ansi.red": "{{colors.error.dark.hex}}",
        "terminal.ansi.bright_red": "{{colors.error.dark.hex}}",
        "terminal.ansi.dim_red": "{{colors.error.dark.hex}}",
        "terminal.ansi.green": "{{colors.tertiary.dark.hex}}",
        "terminal.ansi.bright_green": "{{colors.tertiary.dark.hex}}",
        "terminal.ansi.dim_green": "{{colors.tertiary.dark.hex}}",
        "terminal.ansi.yellow": "{{colors.tertiary_container.dark.hex}}",
        "terminal.ansi.bright_yellow": "{{colors.tertiary_container.dark.hex}}",
        "terminal.ansi.dim_yellow": "{{colors.tertiary_container.dark.hex}}",
        "terminal.ansi.blue": "{{colors.primary.dark.hex}}",
        "terminal.ansi.bright_blue": "{{colors.primary.dark.hex}}",
        "terminal.ansi.dim_blue": "{{colors.primary.dark.hex}}",
        "terminal.ansi.magenta": "{{colors.secondary.dark.hex}}",
        "terminal.ansi.bright_magenta": "{{colors.secondary.dark.hex}}",
        "terminal.ansi.dim_magenta": "{{colors.secondary.dark.hex}}",
        "terminal.ansi.cyan": "{{colors.primary.dark.hex}}",
        "terminal.ansi.bright_cyan": "{{colors.primary.dark.hex}}",
        "terminal.ansi.dim_cyan": "{{colors.primary.dark.hex}}",
        "terminal.ansi.white": "{{colors.on_surface.dark.hex}}",
        "terminal.ansi.bright_white": "{{colors.on_surface.dark.hex}}",
        "terminal.ansi.dim_white": "{{colors.on_surface_variant.dark.hex}}",
        "link_text.hover": "{{colors.primary.dark.hex}}",
        "conflict": "{{colors.error.dark.hex}}",
        "conflict.background": "{{colors.error_container.dark.hex}}",
        "conflict.border": "{{colors.error.dark.hex}}",
        "created": "{{colors.tertiary.dark.hex}}",
        "created.background": "{{colors.tertiary_container.dark.hex}}",
        "created.border": "{{colors.tertiary.dark.hex}}",
        "deleted": "{{colors.error.dark.hex}}",
        "deleted.background": "{{colors.error_container.dark.hex}}",
        "deleted.border": "{{colors.error.dark.hex}}",
        "error": "{{colors.error.dark.hex}}",
        "error.background": "{{colors.error_container.dark.hex}}",
        "error.border": "{{colors.error.dark.hex}}",
        "hidden": "{{colors.outline_variant.dark.hex}}",
        "hidden.border": "{{colors.outline_variant.dark.hex}}",
        "hint": "{{colors.secondary.dark.hex}}",
        "hint.background": "{{colors.secondary_container.dark.hex}}",
        "hint.border": "{{colors.secondary.dark.hex}}",
        "ignored": "{{colors.outline.dark.hex}}",
        "ignored.background": "{{colors.surface_container_high.dark.hex}}",
        "ignored.border": "{{colors.outline.dark.hex}}",
        "info": "{{colors.primary.dark.hex}}",
        "info.background": "{{colors.primary_container.dark.hex}}",
        "info.border": "{{colors.primary.dark.hex}}",
        "modified": "{{colors.secondary.dark.hex}}",
        "modified.background": "{{colors.secondary_container.dark.hex}}",
        "modified.border": "{{colors.secondary.dark.hex}}",
        "predictive": "{{colors.tertiary.dark.hex}}",
        "predictive.border": "{{colors.tertiary.dark.hex}}",
        "predictive.background": "{{colors.tertiary_container.dark.hex}}",
        "renamed": "{{colors.primary.dark.hex}}",
        "renamed.border": "{{colors.primary.dark.hex}}",
        "renamed.background": "{{colors.primary_container.dark.hex}}",
        "success": "{{colors.tertiary.dark.hex}}",
        "success.background": "{{colors.tertiary_container.dark.hex}}",
        "success.border": "{{colors.tertiary.dark.hex}}",
        "unreachable": "{{colors.error.dark.hex}}",
        "unreachable.background": "{{colors.error_container.dark.hex}}",
        "unreachable.border": "{{colors.error.dark.hex}}",
        "warning": "{{colors.tertiary_container.dark.hex}}",
        "warning.background": "{{colors.tertiary_container.dark.hex}}",
        "warning.border": "{{colors.tertiary.dark.hex}}",
        "players": {
          "cursor": "{{colors.primary.dark.hex}}",
          "background": "{{colors.primary_container.dark.hex}}",
          "selection": "{{colors.primary_container.dark.hex}}"
        },
        "syntax": {
          "boolean": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "comment": {
            "color": "{{colors.outline.dark.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "comment.doc": {
            "color": "{{colors.outline.dark.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "constant": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "constructor": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "emphasis": {
            "color": "{{colors.tertiary.dark.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "emphasis.strong": {
            "color": "{{colors.tertiary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 700
          },
          "function": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "keyword": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "number": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "operator": {
            "color": "{{colors.on_surface.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "property": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation": {
            "color": "{{colors.on_surface_variant.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.bracket": {
            "color": "{{colors.on_surface_variant.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.delimiter": {
            "color": "{{colors.on_surface_variant.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.list_marker": {
            "color": "{{colors.on_surface_variant.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.special": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string": {
            "color": "{{colors.tertiary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.escape": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.regex": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.special": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.special.symbol": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "tag": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "text.literal": {
            "color": "{{colors.on_surface.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "type": {
            "color": "{{colors.secondary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "variable": {
            "color": "{{colors.on_surface.dark.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "variable.special": {
            "color": "{{colors.primary.dark.hex}}",
            "font_style": "normal",
            "font_weight": 500
          }
        }
      }
    },
    {
      "name": "Matugen Light",
      "appearance": "light",
      "style": {
        "accents": [
          "{{colors.primary.light.hex}}",
          "{{colors.secondary.light.hex}}",
          "{{colors.tertiary.light.hex}}",
          "{{colors.error.light.hex}}",
          "{{colors.success.light.hex}}"
        ],
        "background.appearance": "opaque",
        "border": "{{colors.outline_variant.light.hex}}",
        "border.variant": "{{colors.outline.light.hex}}",
        "border.focused": "{{colors.primary.light.hex}}",
        "border.selected": "{{colors.primary.light.hex}}",
        "border.transparent": "transparent",
        "border.disabled": "{{colors.outline_variant.light.hex}}",
        "elevated_surface.background": "{{colors.surface_container_high.light.hex}}",
        "surface.background": "{{colors.surface.light.hex}}",
        "background": "{{colors.surface.light.hex}}",
        "element.background": "{{colors.surface_bright.light.hex}}",
        "element.hover": "{{colors.surface_container_low.light.hex}}",
        "element.active": "{{colors.surface_container_high.light.hex}}",
        "element.selected": "{{colors.primary_container.light.hex}}",
        "element.disabled": "{{colors.surface_container_low.light.hex}}",
        "drop_target.background": "{{colors.primary_container.light.hex}}",
        "ghost_element.background": "transparent",
        "ghost_element.hover": "{{colors.surface_container_low.light.hex}}",
        "ghost_element.active": "{{colors.surface_container_high.light.hex}}",
        "ghost_element.selected": "{{colors.primary_container.light.hex}}",
        "ghost_element.disabled": "transparent",
        "text": "{{colors.on_surface.light.hex}}",
        "text.muted": "{{colors.on_surface_variant.light.hex}}",
        "text.placeholder": "{{colors.on_surface_variant.light.hex}}",
        "text.disabled": "{{colors.outline.light.hex}}",
        "text.accent": "{{colors.primary.light.hex}}",
        "icon": "{{colors.on_surface.light.hex}}",
        "icon.muted": "{{colors.on_surface_variant.light.hex}}",
        "icon.disabled": "{{colors.outline.light.hex}}",
        "icon.placeholder": "{{colors.outline_variant.light.hex}}",
        "icon.accent": "{{colors.primary.light.hex}}",
        "status_bar.background": "{{colors.surface.light.hex}}",
        "title_bar.background": "{{colors.surface.light.hex}}",
        "title_bar.inactive_background": "{{colors.surface.light.hex}}",
        "toolbar.background": "{{colors.surface.light.hex}}",
        "tab_bar.background": "{{colors.surface.light.hex}}",
        "tab.inactive_background": "{{colors.surface.light.hex}}",
        "tab.active_background": "{{colors.surface_bright.light.hex}}",
        "search.match_background": "{{colors.tertiary_container.light.hex}}",
        "panel.background": "{{colors.surface.light.hex}}",
        "panel.focused_border": "{{colors.primary.light.hex}}",
        "pane.focused_border": "{{colors.primary.light.hex}}",
        "scrollbar.thumb.background": "{{colors.outline_variant.light.hex}}",
        "scrollbar.thumb.hover_background": "{{colors.outline.light.hex}}",
        "scrollbar.thumb.border": "transparent",
        "scrollbar.track.background": "transparent",
        "scrollbar.track.border": "transparent",
        "editor.foreground": "{{colors.on_surface.light.hex}}",
        "editor.background": "{{colors.surface.light.hex}}",
        "editor.gutter.background": "{{colors.surface.light.hex}}",
        "editor.subheader.background": "{{colors.surface_bright.light.hex}}",
        "editor.indent_guide": "{{colors.outline_variant.light.hex}}",
        "editor.indent_guide_active": "{{colors.outline.light.hex}}",
        "editor.active_line.background": "{{colors.surface_bright.light.hex}}",
        "editor.highlighted_line.background": "{{colors.surface_container_low.light.hex}}",
        "editor.line_number": "{{colors.on_surface_variant.light.hex}}",
        "editor.active_line_number": "{{colors.on_surface.light.hex}}",
        "editor.invisible": "{{colors.outline_variant.light.hex}}",
        "editor.wrap_guide": "{{colors.outline_variant.light.hex}}",
        "editor.active_wrap_guide": "{{colors.outline.light.hex}}",
        "editor.document_highlight.read_background": "{{colors.primary_container.light.hex}}",
        "editor.document_highlight.write_background": "{{colors.secondary_container.light.hex}}",
        "terminal.background": "{{colors.surface.light.hex}}",
        "terminal.foreground": "{{colors.on_surface.light.hex}}",
        "terminal.bright_foreground": "{{colors.on_surface.light.hex}}",
        "terminal.dim_foreground": "{{colors.on_surface_variant.light.hex}}",
        "terminal.ansi.black": "{{colors.surface.light.hex}}",
        "terminal.ansi.bright_black": "{{colors.surface_container_high.light.hex}}",
        "terminal.ansi.dim_black": "{{colors.surface_container_low.light.hex}}",
        "terminal.ansi.red": "{{colors.error.light.hex}}",
        "terminal.ansi.bright_red": "{{colors.error.light.hex}}",
        "terminal.ansi.dim_red": "{{colors.error.light.hex}}",
        "terminal.ansi.green": "{{colors.tertiary.light.hex}}",
        "terminal.ansi.bright_green": "{{colors.tertiary.light.hex}}",
        "terminal.ansi.dim_green": "{{colors.tertiary.light.hex}}",
        "terminal.ansi.yellow": "{{colors.tertiary_container.light.hex}}",
        "terminal.ansi.bright_yellow": "{{colors.tertiary_container.light.hex}}",
        "terminal.ansi.dim_yellow": "{{colors.tertiary_container.light.hex}}",
        "terminal.ansi.blue": "{{colors.primary.light.hex}}",
        "terminal.ansi.bright_blue": "{{colors.primary.light.hex}}",
        "terminal.ansi.dim_blue": "{{colors.primary.light.hex}}",
        "terminal.ansi.magenta": "{{colors.secondary.light.hex}}",
        "terminal.ansi.bright_magenta": "{{colors.secondary.light.hex}}",
        "terminal.ansi.dim_magenta": "{{colors.secondary.light.hex}}",
        "terminal.ansi.cyan": "{{colors.primary.light.hex}}",
        "terminal.ansi.bright_cyan": "{{colors.primary.light.hex}}",
        "terminal.ansi.dim_cyan": "{{colors.primary.light.hex}}",
        "terminal.ansi.white": "{{colors.on_surface.light.hex}}",
        "terminal.ansi.bright_white": "{{colors.on_surface.light.hex}}",
        "terminal.ansi.dim_white": "{{colors.on_surface_variant.light.hex}}",
        "link_text.hover": "{{colors.primary.light.hex}}",
        "conflict": "{{colors.error.light.hex}}",
        "conflict.background": "{{colors.error_container.light.hex}}",
        "conflict.border": "{{colors.error.light.hex}}",
        "created": "{{colors.tertiary.light.hex}}",
        "created.background": "{{colors.tertiary_container.light.hex}}",
        "created.border": "{{colors.tertiary.light.hex}}",
        "deleted": "{{colors.error.light.hex}}",
        "deleted.background": "{{colors.error_container.light.hex}}",
        "deleted.border": "{{colors.error.light.hex}}",
        "error": "{{colors.error.light.hex}}",
        "error.background": "{{colors.error_container.light.hex}}",
        "error.border": "{{colors.error.light.hex}}",
        "hidden": "{{colors.outline_variant.light.hex}}",
        "hidden.border": "{{colors.outline_variant.light.hex}}",
        "hint": "{{colors.secondary.light.hex}}",
        "hint.background": "{{colors.secondary_container.light.hex}}",
        "hint.border": "{{colors.secondary.light.hex}}",
        "ignored": "{{colors.outline.light.hex}}",
        "ignored.background": "{{colors.surface_container_high.light.hex}}",
        "ignored.border": "{{colors.outline.light.hex}}",
        "info": "{{colors.primary.light.hex}}",
        "info.background": "{{colors.primary_container.light.hex}}",
        "info.border": "{{colors.primary.light.hex}}",
        "modified": "{{colors.secondary.light.hex}}",
        "modified.background": "{{colors.secondary_container.light.hex}}",
        "modified.border": "{{colors.secondary.light.hex}}",
        "predictive": "{{colors.tertiary.light.hex}}",
        "predictive.border": "{{colors.tertiary.light.hex}}",
        "predictive.background": "{{colors.tertiary_container.light.hex}}",
        "renamed": "{{colors.primary.light.hex}}",
        "renamed.border": "{{colors.primary.light.hex}}",
        "renamed.background": "{{colors.primary_container.light.hex}}",
        "success": "{{colors.tertiary.light.hex}}",
        "success.background": "{{colors.tertiary_container.light.hex}}",
        "success.border": "{{colors.tertiary.light.hex}}",
        "unreachable": "{{colors.error.light.hex}}",
        "unreachable.background": "{{colors.error_container.light.hex}}",
        "unreachable.border": "{{colors.error.light.hex}}",
        "warning": "{{colors.tertiary_container.light.hex}}",
        "warning.background": "{{colors.tertiary_container.light.hex}}",
        "warning.border": "{{colors.tertiary.light.hex}}",
        "players": {
          "cursor": "{{colors.primary.light.hex}}",
          "background": "{{colors.primary_container.light.hex}}",
          "selection": "{{colors.primary_container.light.hex}}"
        },
        "syntax": {
          "boolean": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "comment": {
            "color": "{{colors.outline.light.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "comment.doc": {
            "color": "{{colors.outline.light.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "constant": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "constructor": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "emphasis": {
            "color": "{{colors.tertiary.light.hex}}",
            "font_style": "italic",
            "font_weight": 400
          },
          "emphasis.strong": {
            "color": "{{colors.tertiary.light.hex}}",
            "font_style": "normal",
            "font_weight": 700
          },
          "function": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "keyword": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "number": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "operator": {
            "color": "{{colors.on_surface.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "property": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation": {
            "color": "{{colors.on_surface_variant.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.bracket": {
            "color": "{{colors.on_surface_variant.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.delimiter": {
            "color": "{{colors.on_surface_variant.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.list_marker": {
            "color": "{{colors.on_surface_variant.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "punctuation.special": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string": {
            "color": "{{colors.tertiary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.escape": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.regex": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.special": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "string.special.symbol": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "tag": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "text.literal": {
            "color": "{{colors.on_surface.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "type": {
            "color": "{{colors.secondary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          },
          "variable": {
            "color": "{{colors.on_surface.light.hex}}",
            "font_style": "normal",
            "font_weight": 400
          },
          "variable.special": {
            "color": "{{colors.primary.light.hex}}",
            "font_style": "normal",
            "font_weight": 500
          }
        }
      }
    }
  ]
}`;
}
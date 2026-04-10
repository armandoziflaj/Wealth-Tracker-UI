# Color System

This document outlines the color system for the WealthTracker UI application. The system is designed to be strict, consistent, and maintainable, avoiding hardcoded color values in component styles.

## 1. Raw Color Palette

These are the base color definitions. They should **not** be used directly in components. Instead, use the Functional Variables defined below.

### Dark Theme (`:root`)
- `--zen-deep`: `#0D0D0D`
- `--zen-card`: `#1A1A1A`
- `--zen-neon`: `#C6FF5E`
- `--zen-input`: `#262626`
- `--zen-muted`: `#9CA3AF`
- `--zen-error`: `#FF4D4D`
- `--zen-white`: `#FFFFFF`
- `--zen-black`: `#000000`

### Light Theme (`[data-theme='light']`)
- `--zen-light-bg`: `#F9FAFB`
- `--zen-light-surface`: `#FFFFFF`
- `--zen-light-input`: `#E5E7EB`
- `--zen-light-text`: `#111827`
- `--zen-light-dim`: `#6B7280`
- `--zen-light-accent`: `#4FAD00`
- `--zen-light-error`: `#D32F2F`

## 2. RGB Values

For creating transparent colors using `rgba()`, use these variables. This ensures that if a raw color changes, its transparent versions update automatically.

- `--zen-neon-rgb`: `198, 255, 94`
- `--zen-white-rgb`: `255, 255, 255`
- `--zen-black-rgb`: `0, 0, 0`

**Example Usage:** `border: 1px solid rgba(var(--zen-white-rgb), 0.05);`

## 3. Functional Variables

These are the **only** variables that should be used in component CSS modules. They provide a layer of abstraction, describing the *function* of a color rather than its specific value.

| Variable | Description |
|---|---|
| `var(--bg-app)` | The main background color of the application. |
| `var(--bg-surface)` | For surfaces like cards, sidebars, and navbars. |
| `var(--bg-input)` | The background for form input fields. |
| `var(--text-main)` | For primary text, such as titles and important information. |
| `var(--text-dim)` | For secondary text, like labels, subtitles, and muted info. |
| `var(--accent)` | The primary action color (e.g., buttons, highlights). |
| `var(--color-error)` | For displaying error messages and states. |
| `var(--border-color)` | For dividers, borders, and outlines. |

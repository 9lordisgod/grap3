# Prompt: UI Screen Polish

## Task

Polish a Grap3 screen to production quality. Pick one screen and refine layout, animations, empty states, and accessibility.

## Design reference

- Theme: `app/src/theme/theme.ts`
- Components: `app/src/components/ui/`
- Mockup: `docs/mockup/preview.html`
- Brand tokens: `docs/assets/brand/grap3-tokens.css`

## Polish checklist (apply to chosen screen)

### Layout & spacing
- [ ] Consistent `spacing.md` (16px) screen padding
- [ ] Typography hierarchy: hero → display → title → body → caption
- [ ] No hardcoded colors — all from `theme.ts`

### Interactions
- [ ] Press feedback on all tappable elements (opacity 0.7 or scale 0.97)
- [ ] Haptic feedback on swipe actions (Expo Haptics)
- [ ] Smooth transitions between states (Animated or Reanimated)

### Empty states
- [ ] "No matches yet" with CTA to Discover
- [ ] "No messages" with conversation starter suggestions
- [ ] "No profiles" with "check back later" + boost CTA

### Loading states
- [ ] Skeleton cards while feed loads (shimmer on GlassCard)
- [ ] Spinner on button during async actions
- [ ] Pull-to-refresh on Matches and Chat

### Accessibility
- [ ] `accessibilityLabel` on all ActionButtons
- [ ] Minimum 44×44pt touch targets
- [ ] Sufficient contrast (white on black = good; check muted text)

### Micro-animations
- [ ] Match modal: scale + fade entrance
- [ ] Tab bar: active tab indicator slide
- [ ] Swipe deck: card rotation follows finger

## Screen-specific prompts

**DiscoveryScreen:**
> Polish the swipe deck: add card stack depth (3 cards visible), improve swipe physics, add TrustBadge animation on score reveal.

**MatchesScreen:**
> Add segmented control (Matches / Likes You), unread badge, last message preview with timestamp, online green dot.

**ChatScreen:**
> Add message bubbles (sent=accent, received=surface), timestamp groups, typing indicator dots animation, input bar with send button gradient.

**ProfileScreen:**
> Add tier badge, Grapes balance, settings section, edit mode toggle, photo grid with drag reorder.

**OnboardingScreen:**
> Add step progress indicator (3 dots), smooth step transitions, wallet connect animation.

## Acceptance criteria

- [ ] Screen matches OLED + `#14F195` accent design system
- [ ] No regressions on other screens
- [ ] Works on Android emulator at 360×800 and Seeker resolution
- [ ] Empty and loading states implemented

## Constraints

- Do not change navigation structure
- Reuse existing UI components; extend, don't duplicate
- No new npm deps unless animation library (reanimated) is justified
export function drawStatusText (ctx, input, player) {
    ctx.font = "28px Helvetica";
    ctx.fillText(
        "Last input: ".concat(input.lastKey),
        20,
        50,
    )
    ctx.fillText(
        "Active state: ".concat(player.currentState.state),
        20,
        90,
    )
}
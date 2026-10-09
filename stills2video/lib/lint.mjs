// "Anti-slideshow" checks before rendering. Original code (Apache-2.0, © 2026 天机).
// Idea credit: OpenMontage (AGPL-3.0) blocks renders whose plan "looks like a slideshow" (slideshow-risk score);
// this is our own much smaller rule set, written from scratch — no code or wording copied.
export function lint(sb, plan) {
  const warn = [];
  const motions = plan.map((p) => p.motion.preset);
  for (let i = 2; i < motions.length; i++) if (motions[i] === motions[i - 1] && motions[i] === motions[i - 2]) warn.push(`${plan[i].id}：连续 3 个镜头都是 ${motions[i]}，观感像幻灯片 → 换个运镜或配方`);
  plan.forEach((p) => {
    if (p.duration > 7 && !p.loop && ['kenburns', 'static'].includes(p.motion.preset)) warn.push(`${p.id}：${p.duration}s 的${p.motion.preset === 'static' ? '静止' : '平推'}镜头偏长 → 拆成两镜或换成 orbit/drift`);
    if (p.backend === 'cpu' && p.motion.preset !== 'kenburns' && (p.motion.parallax ?? 1) > 0 && p.depth === 'gradient') warn.push(`${p.id}：没有深度模型，视差用的是“渐变深度”近似 → npm run setup:depth 效果更好`);
  });
  const flat = plan.filter((p) => !(p.overlays?.length || p.fx?.length || p.flow)).length;
  if (plan.length >= 4 && flat === plan.length) warn.push('所有镜头都没有叠层特效（雾/光/粒子）→ 至少给空镜加一层氛围');
  const cuts = (sb.shots || []).filter((s, i) => i < sb.shots.length - 1 && !s.bridge && !sb.shots[i + 1].bridge && (s.transition_resolved ?? s.transition) === 'cut').length;
  if (plan.length >= 4 && cuts === plan.length - 1) warn.push('全部硬切；空镜之间建议用 fade / huashu 转场');
  return warn;
}

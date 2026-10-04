const CONTENT_TAGS = 'a,button,img,svg,canvas,input,textarea,select,label,video,p,h1,h2,h3,h4,h5,h6,span,li,ul,ol,table,iframe';

/** True when the pointer is over page content (not bare background) so interactive backgrounds should ignore it. */
export function isOverContent(target: EventTarget | null, extraSelector?: string): boolean {
  if (!(target instanceof Element)) return false;
  const selector = extraSelector ? `${CONTENT_TAGS},${extraSelector}` : CONTENT_TAGS;
  return target.closest(selector) !== null;
}

/**
 * Проверяет, является ли сообщение завершающим (прощание, благодарность).
 * Для таких сообщений не показываем варианты быстрых ответов.
 */
export function isClosingMessage(content: string): boolean {
  const closingPatterns = [
    /спасибо за общение/i,
    /спасибо за (ваши )?данные/i,
    /спасибо.*свяжемся/i,
    /свяжемся с вами/i,
    /свяжетесь с (вами|ним)/i,
    /обсудим.*свяжемся/i,
    /обсудим.*пожелания/i,
    /в ближайшее время/i,
    /до свидания/i,
    /удачи|всего хорошего/i,
    /благодар|поблагодар/i,
    /thanks for (the )?(chat|conversation)/i,
    /thank you.*contact/i,
    /we will contact you/i,
    /danke.*(chat|gespräch)/i,
    /wir melden uns/i,
    /auf wiedersehen/i,
  ]
  return closingPatterns.some((p) => p.test(content))
}

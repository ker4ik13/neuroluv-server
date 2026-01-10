import * as crypto from 'crypto';

export function verifyTelegramWebAppInitData(
  initData: string,
  botToken: string,
) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return { ok: false, reason: 'No hash' };

  params.delete('hash');

  const pairs: string[] = [];
  params.forEach((value, key) => {
    pairs.push(`${key}=${value}`);
  });

  pairs.sort(); // alphabetical by key
  const dataCheckString = pairs.join('\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  const ok = computedHash === hash;
  return { ok, data: Object.fromEntries(params.entries()) };
}

export const isValidJwtToken = (token: string): boolean => {
  if (!token) {
    return false;
  }

  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    return false;
  }

  const header = JSON.parse(atob(tokenParts[0]));
  const payload = JSON.parse(atob(tokenParts[1]));

  if (!header || !payload) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);

  if (payload.exp <= now) {
    return false;
  }

  return true;
};
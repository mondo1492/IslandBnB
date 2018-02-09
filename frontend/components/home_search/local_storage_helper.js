export const presets = () => ({
  bedMin: parseInt(localStorage.getItem('bedMin')),
  priceMin: parseInt(localStorage.getItem('priceMin')),
  priceMax: parseInt(localStorage.getItem('priceMax')),
  guestMin: parseInt(localStorage.getItem('guestMin'))
});

export const savePresets = params => {
  const { bedParams, priceParams, guestParams } = params;
  localStorage.setItem('bedMin', bedParams.min);
  localStorage.setItem('priceMin', priceParams.min);
  localStorage.setItem('priceMax', priceParams.max);
  localStorage.setItem('guestMin', guestParams.min);
}

const dateFormatter = Intl.DateTimeFormat('sv-SE');

export const getParamDate = (date) => !!date ? dateFormatter.format(date) : null;
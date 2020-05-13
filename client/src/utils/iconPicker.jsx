export const iconPicker = (dataType) => {
  let iconType;

  switch (true) {
    case dataType === 'text':
      iconType = 'paragraph';
      break;
    case dataType === 'integer' || dataType === 'numeric' || dataType === 'uuid':
      iconType = 'hashtag';
      break;
    case dataType === 'boolean':
      iconType = 'toggle-off';
      break;
    case dataType === 'timestamp without time zone' || dataType === 'date':
      iconType = 'calendar-alt';
      break;
    case dataType === 'character varying':
      iconType = 'font';
      break;
    default:
      iconType = 'question-circle';
      break;
  }
  return iconType;
};

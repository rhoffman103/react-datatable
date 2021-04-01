export const getFlexStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
];

export const flexHeaderProps = (props, { column }) => getFlexStyles(props, column.align);

export const flexCellProps = (props, { cell }) => getFlexStyles(props, cell.column.align);
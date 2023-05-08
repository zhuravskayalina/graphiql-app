import { IntrospectionQuery___schema_types_fields_type } from '@/generatedTypes/IntrospectionQuery';

interface Type {
  type: IntrospectionQuery___schema_types_fields_type;
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

const Type = ({ type, changeType }: Type) => {
  const selectTypeName = () => {
    if (type.kind === 'SCALAR') {
      return type.name;
    }
    if (type.kind === 'OBJECT') {
      return type.name;
    }
    if (type.kind === 'LIST') {
      return `[${type.ofType?.name}]`;
    }
    if (type.kind === 'NON_NULL') {
      return type.ofType?.kind === 'LIST'
        ? `[${type.ofType.ofType?.name}]!`
        : `${type.ofType?.name}!`;
    }
  };

  return (
    <span data-type={selectTypeName()?.replace(/\[|\]|\!/g, '')} onClick={changeType}>
      {selectTypeName()}
    </span>
  );
};

export default Type;

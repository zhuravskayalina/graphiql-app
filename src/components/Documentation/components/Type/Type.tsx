import { Type, TypeArg } from '../../types';
import styles from './Type.module.scss';

const selectTypeName = (type: TypeArg): string | null => {
  if (!type.ofType) {
    return type.name;
  }
  if (type.kind === 'LIST') {
    return `[${selectTypeName(type.ofType)}]`;
  }
  if (type.kind === 'NON_NULL') {
    return `${selectTypeName(type.ofType)}!`;
  }
  return type.name;
};

const Type = ({ type, changeType }: Type) => {
  const typeName = selectTypeName(type);
  return (
    <span
      className={styles.type}
      data-type={typeName?.replace(/\[|\]|\!/g, '')}
      onClick={changeType}
    >
      {typeName}
    </span>
  );
};

export default Type;

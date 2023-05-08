import { Args, TypeArg } from '../../types';
import styles from './Arguments.module.scss';

const selectArgumentsTypeName = (type: TypeArg): string | null => {
  if (!type.ofType) {
    return type.name;
  }
  if (type.kind === 'LIST') {
    return `[${selectArgumentsTypeName(type.ofType)}]`;
  }
  if (type.kind === 'NON_NULL') {
    return `${selectArgumentsTypeName(type.ofType)}!`;
  }
  return type.name;
};

const Arguments = ({ args, changeType }: Args) => {
  return (
    <>
      {args.length !== 0 ? '(' : ''}
      {args.map((arg, index) => {
        const typeName = selectArgumentsTypeName(arg?.type);
        return (
          <div className={styles.wrapper} key={arg.name}>
            <p className={styles.name}>{arg.name}:</p>
            {index !== args.length - 1 ? (
              <div className={styles.argument}>
                <span
                  className={styles.type}
                  data-type={typeName?.replace(/\[|\]|\!/g, '')}
                  onClick={changeType}
                >
                  {typeName}
                </span>
                {','}
              </div>
            ) : (
              <span
                className={styles.type}
                data-type={typeName?.replace(/\[|\]|\!/g, '')}
                onClick={changeType}
              >
                {typeName}
              </span>
            )}
          </div>
        );
      })}
      {args.length !== 0 ? ')' : ''}
    </>
  );
};

export default Arguments;

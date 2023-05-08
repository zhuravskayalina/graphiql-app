import { IntrospectionQuery___schema } from '@/generatedTypes/IntrospectionQuery';

interface Schema {
  schema: IntrospectionQuery___schema;
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

const Schema = ({ schema, changeType }: Schema) => {
  return (
    <div>
      <h3>Documentation</h3>
      <p>A GraphQL schema provides a root type for each kind of operation.</p>
      <h4>Root Types</h4>
      {schema.queryType ? (
        <div>
          query:
          <span data-type={schema.queryType.name} onClick={changeType}>
            {schema.queryType.name}
          </span>
        </div>
      ) : null}
      {schema.mutationType ? (
        <div>
          mutation:<p>`${schema.mutationType.name}`</p>
        </div>
      ) : null}
      {schema.subscriptionType ? (
        <div>
          subscription:<p>`${schema.subscriptionType.name}`</p>
        </div>
      ) : null}
    </div>
  );
};

export default Schema;

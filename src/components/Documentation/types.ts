import {
  IntrospectionQuery___schema_types,
  IntrospectionQuery___schema_types_fields_args,
  IntrospectionQuery___schema_types_fields_type,
} from '@/generatedTypes/IntrospectionQuery';
import { __TypeKind } from '@/generatedTypes/globalTypes';
import { IntrospectionSchema } from 'graphql';

export interface Path {
  path: string[];
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Fields {
  object: IntrospectionQuery___schema_types;
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Schema {
  schema: IntrospectionSchema;
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Type {
  type: IntrospectionQuery___schema_types_fields_type;
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Args {
  args: IntrospectionQuery___schema_types_fields_args[];
  changeType: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface TypeArg {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType?: TypeArg | null;
}

import { __TypeKind } from './globalTypes';

export interface InputValue_type_ofType_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
}

export interface InputValue_type_ofType_ofType_ofType_ofType_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface InputValue_type_ofType_ofType_ofType_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType_ofType_ofType_ofType_ofType | null;
}

export interface InputValue_type_ofType_ofType_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType_ofType_ofType_ofType | null;
}

export interface InputValue_type_ofType_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType_ofType_ofType | null;
}

export interface InputValue_type_ofType_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType_ofType | null;
}

export interface InputValue_type_ofType {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType_ofType | null;
}

export interface InputValue_type {
  __typename: '__Type';
  kind: __TypeKind;
  name: string | null;
  ofType: InputValue_type_ofType | null;
}

export interface InputValue {
  __typename: '__InputValue';
  name: string;
  description: string | null;
  type: InputValue_type;
  defaultValue: string | null;
}

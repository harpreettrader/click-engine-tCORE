// Automatically generated by GDevelop.js/scripts/generate-types.js
declare class gdObjectJsImplementation extends gdObjectConfiguration {
  constructor(): void;
  clone(): gdUniquePtrObjectConfiguration;
  getProperties(): gdMapStringPropertyDescriptor;
  updateProperty(name: string, value: string): boolean;
  getInitialInstanceProperties(instance: gdInitialInstance): gdMapStringPropertyDescriptor;
  updateInitialInstanceProperty(instance: gdInitialInstance, name: string, value: string): boolean;
  getRawJSONContent(): string;
  setRawJSONContent(newContent: string): gdObjectJsImplementation;
  serializeTo(element: gdSerializerElement): void;
  unserializeFrom(project: gdProject, element: gdSerializerElement): void;
  delete(): void;
  ptr: number;
};

/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model DatabaseConnection
 * 
 */
export type DatabaseConnection = $Result.DefaultSelection<Prisma.$DatabaseConnectionPayload>
/**
 * Model MetricSnapshot
 * 
 */
export type MetricSnapshot = $Result.DefaultSelection<Prisma.$MetricSnapshotPayload>
/**
 * Model Spotlight
 * 
 */
export type Spotlight = $Result.DefaultSelection<Prisma.$SpotlightPayload>
/**
 * Model DbCredential
 * 
 */
export type DbCredential = $Result.DefaultSelection<Prisma.$DbCredentialPayload>
/**
 * Model Startup
 * 
 */
export type Startup = $Result.DefaultSelection<Prisma.$StartupPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MessageType: {
  RESULT: 'RESULT',
  ERROR: 'ERROR'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

}

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DatabaseConnections
 * const databaseConnections = await prisma.databaseConnection.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more DatabaseConnections
   * const databaseConnections = await prisma.databaseConnection.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.databaseConnection`: Exposes CRUD operations for the **DatabaseConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DatabaseConnections
    * const databaseConnections = await prisma.databaseConnection.findMany()
    * ```
    */
  get databaseConnection(): Prisma.DatabaseConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.metricSnapshot`: Exposes CRUD operations for the **MetricSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MetricSnapshots
    * const metricSnapshots = await prisma.metricSnapshot.findMany()
    * ```
    */
  get metricSnapshot(): Prisma.MetricSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spotlight`: Exposes CRUD operations for the **Spotlight** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spotlights
    * const spotlights = await prisma.spotlight.findMany()
    * ```
    */
  get spotlight(): Prisma.SpotlightDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dbCredential`: Exposes CRUD operations for the **DbCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DbCredentials
    * const dbCredentials = await prisma.dbCredential.findMany()
    * ```
    */
  get dbCredential(): Prisma.DbCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.startup`: Exposes CRUD operations for the **Startup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Startups
    * const startups = await prisma.startup.findMany()
    * ```
    */
  get startup(): Prisma.StartupDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.0
   * Query Engine version: 9c30299f5a0ea26a96790e13f796dc6094db3173
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    DatabaseConnection: 'DatabaseConnection',
    MetricSnapshot: 'MetricSnapshot',
    Spotlight: 'Spotlight',
    DbCredential: 'DbCredential',
    Startup: 'Startup'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "databaseConnection" | "metricSnapshot" | "spotlight" | "dbCredential" | "startup"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DatabaseConnection: {
        payload: Prisma.$DatabaseConnectionPayload<ExtArgs>
        fields: Prisma.DatabaseConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DatabaseConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DatabaseConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          findFirst: {
            args: Prisma.DatabaseConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DatabaseConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          findMany: {
            args: Prisma.DatabaseConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>[]
          }
          create: {
            args: Prisma.DatabaseConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          createMany: {
            args: Prisma.DatabaseConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DatabaseConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>[]
          }
          delete: {
            args: Prisma.DatabaseConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          update: {
            args: Prisma.DatabaseConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          deleteMany: {
            args: Prisma.DatabaseConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DatabaseConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DatabaseConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>[]
          }
          upsert: {
            args: Prisma.DatabaseConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DatabaseConnectionPayload>
          }
          aggregate: {
            args: Prisma.DatabaseConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDatabaseConnection>
          }
          groupBy: {
            args: Prisma.DatabaseConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DatabaseConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DatabaseConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<DatabaseConnectionCountAggregateOutputType> | number
          }
        }
      }
      MetricSnapshot: {
        payload: Prisma.$MetricSnapshotPayload<ExtArgs>
        fields: Prisma.MetricSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MetricSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MetricSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          findFirst: {
            args: Prisma.MetricSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MetricSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          findMany: {
            args: Prisma.MetricSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          create: {
            args: Prisma.MetricSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          createMany: {
            args: Prisma.MetricSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MetricSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          delete: {
            args: Prisma.MetricSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          update: {
            args: Prisma.MetricSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MetricSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MetricSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MetricSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.MetricSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MetricSnapshotPayload>
          }
          aggregate: {
            args: Prisma.MetricSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMetricSnapshot>
          }
          groupBy: {
            args: Prisma.MetricSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MetricSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.MetricSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MetricSnapshotCountAggregateOutputType> | number
          }
        }
      }
      Spotlight: {
        payload: Prisma.$SpotlightPayload<ExtArgs>
        fields: Prisma.SpotlightFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpotlightFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpotlightFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          findFirst: {
            args: Prisma.SpotlightFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpotlightFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          findMany: {
            args: Prisma.SpotlightFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>[]
          }
          create: {
            args: Prisma.SpotlightCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          createMany: {
            args: Prisma.SpotlightCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpotlightCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>[]
          }
          delete: {
            args: Prisma.SpotlightDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          update: {
            args: Prisma.SpotlightUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          deleteMany: {
            args: Prisma.SpotlightDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpotlightUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpotlightUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>[]
          }
          upsert: {
            args: Prisma.SpotlightUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpotlightPayload>
          }
          aggregate: {
            args: Prisma.SpotlightAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpotlight>
          }
          groupBy: {
            args: Prisma.SpotlightGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpotlightGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpotlightCountArgs<ExtArgs>
            result: $Utils.Optional<SpotlightCountAggregateOutputType> | number
          }
        }
      }
      DbCredential: {
        payload: Prisma.$DbCredentialPayload<ExtArgs>
        fields: Prisma.DbCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DbCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DbCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          findFirst: {
            args: Prisma.DbCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DbCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          findMany: {
            args: Prisma.DbCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>[]
          }
          create: {
            args: Prisma.DbCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          createMany: {
            args: Prisma.DbCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DbCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>[]
          }
          delete: {
            args: Prisma.DbCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          update: {
            args: Prisma.DbCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          deleteMany: {
            args: Prisma.DbCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DbCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DbCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>[]
          }
          upsert: {
            args: Prisma.DbCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DbCredentialPayload>
          }
          aggregate: {
            args: Prisma.DbCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDbCredential>
          }
          groupBy: {
            args: Prisma.DbCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<DbCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.DbCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<DbCredentialCountAggregateOutputType> | number
          }
        }
      }
      Startup: {
        payload: Prisma.$StartupPayload<ExtArgs>
        fields: Prisma.StartupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StartupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StartupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          findFirst: {
            args: Prisma.StartupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StartupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          findMany: {
            args: Prisma.StartupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          create: {
            args: Prisma.StartupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          createMany: {
            args: Prisma.StartupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StartupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          delete: {
            args: Prisma.StartupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          update: {
            args: Prisma.StartupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          deleteMany: {
            args: Prisma.StartupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StartupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StartupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>[]
          }
          upsert: {
            args: Prisma.StartupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StartupPayload>
          }
          aggregate: {
            args: Prisma.StartupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStartup>
          }
          groupBy: {
            args: Prisma.StartupGroupByArgs<ExtArgs>
            result: $Utils.Optional<StartupGroupByOutputType>[]
          }
          count: {
            args: Prisma.StartupCountArgs<ExtArgs>
            result: $Utils.Optional<StartupCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    databaseConnection?: DatabaseConnectionOmit
    metricSnapshot?: MetricSnapshotOmit
    spotlight?: SpotlightOmit
    dbCredential?: DbCredentialOmit
    startup?: StartupOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DatabaseConnectionCountOutputType
   */

  export type DatabaseConnectionCountOutputType = {
    MetricSnapshot: number
  }

  export type DatabaseConnectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MetricSnapshot?: boolean | DatabaseConnectionCountOutputTypeCountMetricSnapshotArgs
  }

  // Custom InputTypes
  /**
   * DatabaseConnectionCountOutputType without action
   */
  export type DatabaseConnectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnectionCountOutputType
     */
    select?: DatabaseConnectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DatabaseConnectionCountOutputType without action
   */
  export type DatabaseConnectionCountOutputTypeCountMetricSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetricSnapshotWhereInput
  }


  /**
   * Count Type DbCredentialCountOutputType
   */

  export type DbCredentialCountOutputType = {
    Startup: number
  }

  export type DbCredentialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Startup?: boolean | DbCredentialCountOutputTypeCountStartupArgs
  }

  // Custom InputTypes
  /**
   * DbCredentialCountOutputType without action
   */
  export type DbCredentialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredentialCountOutputType
     */
    select?: DbCredentialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DbCredentialCountOutputType without action
   */
  export type DbCredentialCountOutputTypeCountStartupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StartupWhereInput
  }


  /**
   * Models
   */

  /**
   * Model DatabaseConnection
   */

  export type AggregateDatabaseConnection = {
    _count: DatabaseConnectionCountAggregateOutputType | null
    _avg: DatabaseConnectionAvgAggregateOutputType | null
    _sum: DatabaseConnectionSumAggregateOutputType | null
    _min: DatabaseConnectionMinAggregateOutputType | null
    _max: DatabaseConnectionMaxAggregateOutputType | null
  }

  export type DatabaseConnectionAvgAggregateOutputType = {
    paidUsers: number | null
    totalUsers: number | null
  }

  export type DatabaseConnectionSumAggregateOutputType = {
    paidUsers: number | null
    totalUsers: number | null
  }

  export type DatabaseConnectionMinAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    connectionString: string | null
    createdAt: Date | null
    updatedAt: Date | null
    startupName: string | null
    slug: string | null
    paidUsers: number | null
    totalUsers: number | null
    category: string | null
    description: string | null
    founderAvatar: string | null
    founderHandle: string | null
    founderName: string | null
    logo: string | null
    tagline: string | null
    website: string | null
    readOnlyConnString: string | null
    readOnlyRoleName: string | null
  }

  export type DatabaseConnectionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    connectionString: string | null
    createdAt: Date | null
    updatedAt: Date | null
    startupName: string | null
    slug: string | null
    paidUsers: number | null
    totalUsers: number | null
    category: string | null
    description: string | null
    founderAvatar: string | null
    founderHandle: string | null
    founderName: string | null
    logo: string | null
    tagline: string | null
    website: string | null
    readOnlyConnString: string | null
    readOnlyRoleName: string | null
  }

  export type DatabaseConnectionCountAggregateOutputType = {
    id: number
    name: number
    provider: number
    connectionString: number
    selectedTables: number
    createdAt: number
    updatedAt: number
    startupName: number
    slug: number
    paidUsers: number
    totalUsers: number
    category: number
    description: number
    founderAvatar: number
    founderHandle: number
    founderName: number
    logo: number
    tagline: number
    website: number
    readOnlyConnString: number
    readOnlyRoleName: number
    _all: number
  }


  export type DatabaseConnectionAvgAggregateInputType = {
    paidUsers?: true
    totalUsers?: true
  }

  export type DatabaseConnectionSumAggregateInputType = {
    paidUsers?: true
    totalUsers?: true
  }

  export type DatabaseConnectionMinAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    connectionString?: true
    createdAt?: true
    updatedAt?: true
    startupName?: true
    slug?: true
    paidUsers?: true
    totalUsers?: true
    category?: true
    description?: true
    founderAvatar?: true
    founderHandle?: true
    founderName?: true
    logo?: true
    tagline?: true
    website?: true
    readOnlyConnString?: true
    readOnlyRoleName?: true
  }

  export type DatabaseConnectionMaxAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    connectionString?: true
    createdAt?: true
    updatedAt?: true
    startupName?: true
    slug?: true
    paidUsers?: true
    totalUsers?: true
    category?: true
    description?: true
    founderAvatar?: true
    founderHandle?: true
    founderName?: true
    logo?: true
    tagline?: true
    website?: true
    readOnlyConnString?: true
    readOnlyRoleName?: true
  }

  export type DatabaseConnectionCountAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    connectionString?: true
    selectedTables?: true
    createdAt?: true
    updatedAt?: true
    startupName?: true
    slug?: true
    paidUsers?: true
    totalUsers?: true
    category?: true
    description?: true
    founderAvatar?: true
    founderHandle?: true
    founderName?: true
    logo?: true
    tagline?: true
    website?: true
    readOnlyConnString?: true
    readOnlyRoleName?: true
    _all?: true
  }

  export type DatabaseConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DatabaseConnection to aggregate.
     */
    where?: DatabaseConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DatabaseConnections to fetch.
     */
    orderBy?: DatabaseConnectionOrderByWithRelationInput | DatabaseConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DatabaseConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DatabaseConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DatabaseConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DatabaseConnections
    **/
    _count?: true | DatabaseConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DatabaseConnectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DatabaseConnectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DatabaseConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DatabaseConnectionMaxAggregateInputType
  }

  export type GetDatabaseConnectionAggregateType<T extends DatabaseConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateDatabaseConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDatabaseConnection[P]>
      : GetScalarType<T[P], AggregateDatabaseConnection[P]>
  }




  export type DatabaseConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DatabaseConnectionWhereInput
    orderBy?: DatabaseConnectionOrderByWithAggregationInput | DatabaseConnectionOrderByWithAggregationInput[]
    by: DatabaseConnectionScalarFieldEnum[] | DatabaseConnectionScalarFieldEnum
    having?: DatabaseConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DatabaseConnectionCountAggregateInputType | true
    _avg?: DatabaseConnectionAvgAggregateInputType
    _sum?: DatabaseConnectionSumAggregateInputType
    _min?: DatabaseConnectionMinAggregateInputType
    _max?: DatabaseConnectionMaxAggregateInputType
  }

  export type DatabaseConnectionGroupByOutputType = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables: string[]
    createdAt: Date
    updatedAt: Date
    startupName: string
    slug: string | null
    paidUsers: number | null
    totalUsers: number | null
    category: string | null
    description: string | null
    founderAvatar: string | null
    founderHandle: string | null
    founderName: string | null
    logo: string | null
    tagline: string | null
    website: string | null
    readOnlyConnString: string | null
    readOnlyRoleName: string | null
    _count: DatabaseConnectionCountAggregateOutputType | null
    _avg: DatabaseConnectionAvgAggregateOutputType | null
    _sum: DatabaseConnectionSumAggregateOutputType | null
    _min: DatabaseConnectionMinAggregateOutputType | null
    _max: DatabaseConnectionMaxAggregateOutputType | null
  }

  type GetDatabaseConnectionGroupByPayload<T extends DatabaseConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DatabaseConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DatabaseConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DatabaseConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], DatabaseConnectionGroupByOutputType[P]>
        }
      >
    >


  export type DatabaseConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    connectionString?: boolean
    selectedTables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startupName?: boolean
    slug?: boolean
    paidUsers?: boolean
    totalUsers?: boolean
    category?: boolean
    description?: boolean
    founderAvatar?: boolean
    founderHandle?: boolean
    founderName?: boolean
    logo?: boolean
    tagline?: boolean
    website?: boolean
    readOnlyConnString?: boolean
    readOnlyRoleName?: boolean
    MetricSnapshot?: boolean | DatabaseConnection$MetricSnapshotArgs<ExtArgs>
    _count?: boolean | DatabaseConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["databaseConnection"]>

  export type DatabaseConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    connectionString?: boolean
    selectedTables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startupName?: boolean
    slug?: boolean
    paidUsers?: boolean
    totalUsers?: boolean
    category?: boolean
    description?: boolean
    founderAvatar?: boolean
    founderHandle?: boolean
    founderName?: boolean
    logo?: boolean
    tagline?: boolean
    website?: boolean
    readOnlyConnString?: boolean
    readOnlyRoleName?: boolean
  }, ExtArgs["result"]["databaseConnection"]>

  export type DatabaseConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    connectionString?: boolean
    selectedTables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startupName?: boolean
    slug?: boolean
    paidUsers?: boolean
    totalUsers?: boolean
    category?: boolean
    description?: boolean
    founderAvatar?: boolean
    founderHandle?: boolean
    founderName?: boolean
    logo?: boolean
    tagline?: boolean
    website?: boolean
    readOnlyConnString?: boolean
    readOnlyRoleName?: boolean
  }, ExtArgs["result"]["databaseConnection"]>

  export type DatabaseConnectionSelectScalar = {
    id?: boolean
    name?: boolean
    provider?: boolean
    connectionString?: boolean
    selectedTables?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    startupName?: boolean
    slug?: boolean
    paidUsers?: boolean
    totalUsers?: boolean
    category?: boolean
    description?: boolean
    founderAvatar?: boolean
    founderHandle?: boolean
    founderName?: boolean
    logo?: boolean
    tagline?: boolean
    website?: boolean
    readOnlyConnString?: boolean
    readOnlyRoleName?: boolean
  }

  export type DatabaseConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "provider" | "connectionString" | "selectedTables" | "createdAt" | "updatedAt" | "startupName" | "slug" | "paidUsers" | "totalUsers" | "category" | "description" | "founderAvatar" | "founderHandle" | "founderName" | "logo" | "tagline" | "website" | "readOnlyConnString" | "readOnlyRoleName", ExtArgs["result"]["databaseConnection"]>
  export type DatabaseConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    MetricSnapshot?: boolean | DatabaseConnection$MetricSnapshotArgs<ExtArgs>
    _count?: boolean | DatabaseConnectionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DatabaseConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DatabaseConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DatabaseConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DatabaseConnection"
    objects: {
      MetricSnapshot: Prisma.$MetricSnapshotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      provider: string
      connectionString: string
      selectedTables: string[]
      createdAt: Date
      updatedAt: Date
      startupName: string
      slug: string | null
      paidUsers: number | null
      totalUsers: number | null
      category: string | null
      description: string | null
      founderAvatar: string | null
      founderHandle: string | null
      founderName: string | null
      logo: string | null
      tagline: string | null
      website: string | null
      readOnlyConnString: string | null
      readOnlyRoleName: string | null
    }, ExtArgs["result"]["databaseConnection"]>
    composites: {}
  }

  type DatabaseConnectionGetPayload<S extends boolean | null | undefined | DatabaseConnectionDefaultArgs> = $Result.GetResult<Prisma.$DatabaseConnectionPayload, S>

  type DatabaseConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DatabaseConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DatabaseConnectionCountAggregateInputType | true
    }

  export interface DatabaseConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DatabaseConnection'], meta: { name: 'DatabaseConnection' } }
    /**
     * Find zero or one DatabaseConnection that matches the filter.
     * @param {DatabaseConnectionFindUniqueArgs} args - Arguments to find a DatabaseConnection
     * @example
     * // Get one DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DatabaseConnectionFindUniqueArgs>(args: SelectSubset<T, DatabaseConnectionFindUniqueArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DatabaseConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DatabaseConnectionFindUniqueOrThrowArgs} args - Arguments to find a DatabaseConnection
     * @example
     * // Get one DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DatabaseConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, DatabaseConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DatabaseConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionFindFirstArgs} args - Arguments to find a DatabaseConnection
     * @example
     * // Get one DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DatabaseConnectionFindFirstArgs>(args?: SelectSubset<T, DatabaseConnectionFindFirstArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DatabaseConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionFindFirstOrThrowArgs} args - Arguments to find a DatabaseConnection
     * @example
     * // Get one DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DatabaseConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, DatabaseConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DatabaseConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DatabaseConnections
     * const databaseConnections = await prisma.databaseConnection.findMany()
     * 
     * // Get first 10 DatabaseConnections
     * const databaseConnections = await prisma.databaseConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const databaseConnectionWithIdOnly = await prisma.databaseConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DatabaseConnectionFindManyArgs>(args?: SelectSubset<T, DatabaseConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DatabaseConnection.
     * @param {DatabaseConnectionCreateArgs} args - Arguments to create a DatabaseConnection.
     * @example
     * // Create one DatabaseConnection
     * const DatabaseConnection = await prisma.databaseConnection.create({
     *   data: {
     *     // ... data to create a DatabaseConnection
     *   }
     * })
     * 
     */
    create<T extends DatabaseConnectionCreateArgs>(args: SelectSubset<T, DatabaseConnectionCreateArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DatabaseConnections.
     * @param {DatabaseConnectionCreateManyArgs} args - Arguments to create many DatabaseConnections.
     * @example
     * // Create many DatabaseConnections
     * const databaseConnection = await prisma.databaseConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DatabaseConnectionCreateManyArgs>(args?: SelectSubset<T, DatabaseConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DatabaseConnections and returns the data saved in the database.
     * @param {DatabaseConnectionCreateManyAndReturnArgs} args - Arguments to create many DatabaseConnections.
     * @example
     * // Create many DatabaseConnections
     * const databaseConnection = await prisma.databaseConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DatabaseConnections and only return the `id`
     * const databaseConnectionWithIdOnly = await prisma.databaseConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DatabaseConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, DatabaseConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DatabaseConnection.
     * @param {DatabaseConnectionDeleteArgs} args - Arguments to delete one DatabaseConnection.
     * @example
     * // Delete one DatabaseConnection
     * const DatabaseConnection = await prisma.databaseConnection.delete({
     *   where: {
     *     // ... filter to delete one DatabaseConnection
     *   }
     * })
     * 
     */
    delete<T extends DatabaseConnectionDeleteArgs>(args: SelectSubset<T, DatabaseConnectionDeleteArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DatabaseConnection.
     * @param {DatabaseConnectionUpdateArgs} args - Arguments to update one DatabaseConnection.
     * @example
     * // Update one DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DatabaseConnectionUpdateArgs>(args: SelectSubset<T, DatabaseConnectionUpdateArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DatabaseConnections.
     * @param {DatabaseConnectionDeleteManyArgs} args - Arguments to filter DatabaseConnections to delete.
     * @example
     * // Delete a few DatabaseConnections
     * const { count } = await prisma.databaseConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DatabaseConnectionDeleteManyArgs>(args?: SelectSubset<T, DatabaseConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DatabaseConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DatabaseConnections
     * const databaseConnection = await prisma.databaseConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DatabaseConnectionUpdateManyArgs>(args: SelectSubset<T, DatabaseConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DatabaseConnections and returns the data updated in the database.
     * @param {DatabaseConnectionUpdateManyAndReturnArgs} args - Arguments to update many DatabaseConnections.
     * @example
     * // Update many DatabaseConnections
     * const databaseConnection = await prisma.databaseConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DatabaseConnections and only return the `id`
     * const databaseConnectionWithIdOnly = await prisma.databaseConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DatabaseConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, DatabaseConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DatabaseConnection.
     * @param {DatabaseConnectionUpsertArgs} args - Arguments to update or create a DatabaseConnection.
     * @example
     * // Update or create a DatabaseConnection
     * const databaseConnection = await prisma.databaseConnection.upsert({
     *   create: {
     *     // ... data to create a DatabaseConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DatabaseConnection we want to update
     *   }
     * })
     */
    upsert<T extends DatabaseConnectionUpsertArgs>(args: SelectSubset<T, DatabaseConnectionUpsertArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DatabaseConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionCountArgs} args - Arguments to filter DatabaseConnections to count.
     * @example
     * // Count the number of DatabaseConnections
     * const count = await prisma.databaseConnection.count({
     *   where: {
     *     // ... the filter for the DatabaseConnections we want to count
     *   }
     * })
    **/
    count<T extends DatabaseConnectionCountArgs>(
      args?: Subset<T, DatabaseConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DatabaseConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DatabaseConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DatabaseConnectionAggregateArgs>(args: Subset<T, DatabaseConnectionAggregateArgs>): Prisma.PrismaPromise<GetDatabaseConnectionAggregateType<T>>

    /**
     * Group by DatabaseConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatabaseConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DatabaseConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DatabaseConnectionGroupByArgs['orderBy'] }
        : { orderBy?: DatabaseConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DatabaseConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatabaseConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DatabaseConnection model
   */
  readonly fields: DatabaseConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DatabaseConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DatabaseConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    MetricSnapshot<T extends DatabaseConnection$MetricSnapshotArgs<ExtArgs> = {}>(args?: Subset<T, DatabaseConnection$MetricSnapshotArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DatabaseConnection model
   */
  interface DatabaseConnectionFieldRefs {
    readonly id: FieldRef<"DatabaseConnection", 'String'>
    readonly name: FieldRef<"DatabaseConnection", 'String'>
    readonly provider: FieldRef<"DatabaseConnection", 'String'>
    readonly connectionString: FieldRef<"DatabaseConnection", 'String'>
    readonly selectedTables: FieldRef<"DatabaseConnection", 'String[]'>
    readonly createdAt: FieldRef<"DatabaseConnection", 'DateTime'>
    readonly updatedAt: FieldRef<"DatabaseConnection", 'DateTime'>
    readonly startupName: FieldRef<"DatabaseConnection", 'String'>
    readonly slug: FieldRef<"DatabaseConnection", 'String'>
    readonly paidUsers: FieldRef<"DatabaseConnection", 'Int'>
    readonly totalUsers: FieldRef<"DatabaseConnection", 'Int'>
    readonly category: FieldRef<"DatabaseConnection", 'String'>
    readonly description: FieldRef<"DatabaseConnection", 'String'>
    readonly founderAvatar: FieldRef<"DatabaseConnection", 'String'>
    readonly founderHandle: FieldRef<"DatabaseConnection", 'String'>
    readonly founderName: FieldRef<"DatabaseConnection", 'String'>
    readonly logo: FieldRef<"DatabaseConnection", 'String'>
    readonly tagline: FieldRef<"DatabaseConnection", 'String'>
    readonly website: FieldRef<"DatabaseConnection", 'String'>
    readonly readOnlyConnString: FieldRef<"DatabaseConnection", 'String'>
    readonly readOnlyRoleName: FieldRef<"DatabaseConnection", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DatabaseConnection findUnique
   */
  export type DatabaseConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DatabaseConnection to fetch.
     */
    where: DatabaseConnectionWhereUniqueInput
  }

  /**
   * DatabaseConnection findUniqueOrThrow
   */
  export type DatabaseConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DatabaseConnection to fetch.
     */
    where: DatabaseConnectionWhereUniqueInput
  }

  /**
   * DatabaseConnection findFirst
   */
  export type DatabaseConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DatabaseConnection to fetch.
     */
    where?: DatabaseConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DatabaseConnections to fetch.
     */
    orderBy?: DatabaseConnectionOrderByWithRelationInput | DatabaseConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DatabaseConnections.
     */
    cursor?: DatabaseConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DatabaseConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DatabaseConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DatabaseConnections.
     */
    distinct?: DatabaseConnectionScalarFieldEnum | DatabaseConnectionScalarFieldEnum[]
  }

  /**
   * DatabaseConnection findFirstOrThrow
   */
  export type DatabaseConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DatabaseConnection to fetch.
     */
    where?: DatabaseConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DatabaseConnections to fetch.
     */
    orderBy?: DatabaseConnectionOrderByWithRelationInput | DatabaseConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DatabaseConnections.
     */
    cursor?: DatabaseConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DatabaseConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DatabaseConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DatabaseConnections.
     */
    distinct?: DatabaseConnectionScalarFieldEnum | DatabaseConnectionScalarFieldEnum[]
  }

  /**
   * DatabaseConnection findMany
   */
  export type DatabaseConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter, which DatabaseConnections to fetch.
     */
    where?: DatabaseConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DatabaseConnections to fetch.
     */
    orderBy?: DatabaseConnectionOrderByWithRelationInput | DatabaseConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DatabaseConnections.
     */
    cursor?: DatabaseConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DatabaseConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DatabaseConnections.
     */
    skip?: number
    distinct?: DatabaseConnectionScalarFieldEnum | DatabaseConnectionScalarFieldEnum[]
  }

  /**
   * DatabaseConnection create
   */
  export type DatabaseConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a DatabaseConnection.
     */
    data: XOR<DatabaseConnectionCreateInput, DatabaseConnectionUncheckedCreateInput>
  }

  /**
   * DatabaseConnection createMany
   */
  export type DatabaseConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DatabaseConnections.
     */
    data: DatabaseConnectionCreateManyInput | DatabaseConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DatabaseConnection createManyAndReturn
   */
  export type DatabaseConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many DatabaseConnections.
     */
    data: DatabaseConnectionCreateManyInput | DatabaseConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DatabaseConnection update
   */
  export type DatabaseConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a DatabaseConnection.
     */
    data: XOR<DatabaseConnectionUpdateInput, DatabaseConnectionUncheckedUpdateInput>
    /**
     * Choose, which DatabaseConnection to update.
     */
    where: DatabaseConnectionWhereUniqueInput
  }

  /**
   * DatabaseConnection updateMany
   */
  export type DatabaseConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DatabaseConnections.
     */
    data: XOR<DatabaseConnectionUpdateManyMutationInput, DatabaseConnectionUncheckedUpdateManyInput>
    /**
     * Filter which DatabaseConnections to update
     */
    where?: DatabaseConnectionWhereInput
    /**
     * Limit how many DatabaseConnections to update.
     */
    limit?: number
  }

  /**
   * DatabaseConnection updateManyAndReturn
   */
  export type DatabaseConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * The data used to update DatabaseConnections.
     */
    data: XOR<DatabaseConnectionUpdateManyMutationInput, DatabaseConnectionUncheckedUpdateManyInput>
    /**
     * Filter which DatabaseConnections to update
     */
    where?: DatabaseConnectionWhereInput
    /**
     * Limit how many DatabaseConnections to update.
     */
    limit?: number
  }

  /**
   * DatabaseConnection upsert
   */
  export type DatabaseConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the DatabaseConnection to update in case it exists.
     */
    where: DatabaseConnectionWhereUniqueInput
    /**
     * In case the DatabaseConnection found by the `where` argument doesn't exist, create a new DatabaseConnection with this data.
     */
    create: XOR<DatabaseConnectionCreateInput, DatabaseConnectionUncheckedCreateInput>
    /**
     * In case the DatabaseConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DatabaseConnectionUpdateInput, DatabaseConnectionUncheckedUpdateInput>
  }

  /**
   * DatabaseConnection delete
   */
  export type DatabaseConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
    /**
     * Filter which DatabaseConnection to delete.
     */
    where: DatabaseConnectionWhereUniqueInput
  }

  /**
   * DatabaseConnection deleteMany
   */
  export type DatabaseConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DatabaseConnections to delete
     */
    where?: DatabaseConnectionWhereInput
    /**
     * Limit how many DatabaseConnections to delete.
     */
    limit?: number
  }

  /**
   * DatabaseConnection.MetricSnapshot
   */
  export type DatabaseConnection$MetricSnapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    where?: MetricSnapshotWhereInput
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    cursor?: MetricSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * DatabaseConnection without action
   */
  export type DatabaseConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatabaseConnection
     */
    select?: DatabaseConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DatabaseConnection
     */
    omit?: DatabaseConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DatabaseConnectionInclude<ExtArgs> | null
  }


  /**
   * Model MetricSnapshot
   */

  export type AggregateMetricSnapshot = {
    _count: MetricSnapshotCountAggregateOutputType | null
    _avg: MetricSnapshotAvgAggregateOutputType | null
    _sum: MetricSnapshotSumAggregateOutputType | null
    _min: MetricSnapshotMinAggregateOutputType | null
    _max: MetricSnapshotMaxAggregateOutputType | null
  }

  export type MetricSnapshotAvgAggregateOutputType = {
    totalUsers: number | null
    paidUsers: number | null
    activeUsers: number | null
    newSignups: number | null
    churnedUsers: number | null
  }

  export type MetricSnapshotSumAggregateOutputType = {
    totalUsers: number | null
    paidUsers: number | null
    activeUsers: number | null
    newSignups: number | null
    churnedUsers: number | null
  }

  export type MetricSnapshotMinAggregateOutputType = {
    id: string | null
    connectionId: string | null
    date: Date | null
    totalUsers: number | null
    paidUsers: number | null
    activeUsers: number | null
    newSignups: number | null
    churnedUsers: number | null
    createdAt: Date | null
  }

  export type MetricSnapshotMaxAggregateOutputType = {
    id: string | null
    connectionId: string | null
    date: Date | null
    totalUsers: number | null
    paidUsers: number | null
    activeUsers: number | null
    newSignups: number | null
    churnedUsers: number | null
    createdAt: Date | null
  }

  export type MetricSnapshotCountAggregateOutputType = {
    id: number
    connectionId: number
    date: number
    totalUsers: number
    paidUsers: number
    activeUsers: number
    newSignups: number
    churnedUsers: number
    createdAt: number
    _all: number
  }


  export type MetricSnapshotAvgAggregateInputType = {
    totalUsers?: true
    paidUsers?: true
    activeUsers?: true
    newSignups?: true
    churnedUsers?: true
  }

  export type MetricSnapshotSumAggregateInputType = {
    totalUsers?: true
    paidUsers?: true
    activeUsers?: true
    newSignups?: true
    churnedUsers?: true
  }

  export type MetricSnapshotMinAggregateInputType = {
    id?: true
    connectionId?: true
    date?: true
    totalUsers?: true
    paidUsers?: true
    activeUsers?: true
    newSignups?: true
    churnedUsers?: true
    createdAt?: true
  }

  export type MetricSnapshotMaxAggregateInputType = {
    id?: true
    connectionId?: true
    date?: true
    totalUsers?: true
    paidUsers?: true
    activeUsers?: true
    newSignups?: true
    churnedUsers?: true
    createdAt?: true
  }

  export type MetricSnapshotCountAggregateInputType = {
    id?: true
    connectionId?: true
    date?: true
    totalUsers?: true
    paidUsers?: true
    activeUsers?: true
    newSignups?: true
    churnedUsers?: true
    createdAt?: true
    _all?: true
  }

  export type MetricSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSnapshot to aggregate.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MetricSnapshots
    **/
    _count?: true | MetricSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MetricSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MetricSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MetricSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MetricSnapshotMaxAggregateInputType
  }

  export type GetMetricSnapshotAggregateType<T extends MetricSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMetricSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMetricSnapshot[P]>
      : GetScalarType<T[P], AggregateMetricSnapshot[P]>
  }




  export type MetricSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MetricSnapshotWhereInput
    orderBy?: MetricSnapshotOrderByWithAggregationInput | MetricSnapshotOrderByWithAggregationInput[]
    by: MetricSnapshotScalarFieldEnum[] | MetricSnapshotScalarFieldEnum
    having?: MetricSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MetricSnapshotCountAggregateInputType | true
    _avg?: MetricSnapshotAvgAggregateInputType
    _sum?: MetricSnapshotSumAggregateInputType
    _min?: MetricSnapshotMinAggregateInputType
    _max?: MetricSnapshotMaxAggregateInputType
  }

  export type MetricSnapshotGroupByOutputType = {
    id: string
    connectionId: string
    date: Date
    totalUsers: number
    paidUsers: number
    activeUsers: number
    newSignups: number
    churnedUsers: number
    createdAt: Date
    _count: MetricSnapshotCountAggregateOutputType | null
    _avg: MetricSnapshotAvgAggregateOutputType | null
    _sum: MetricSnapshotSumAggregateOutputType | null
    _min: MetricSnapshotMinAggregateOutputType | null
    _max: MetricSnapshotMaxAggregateOutputType | null
  }

  type GetMetricSnapshotGroupByPayload<T extends MetricSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MetricSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MetricSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MetricSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MetricSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MetricSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    date?: boolean
    totalUsers?: boolean
    paidUsers?: boolean
    activeUsers?: boolean
    newSignups?: boolean
    churnedUsers?: boolean
    createdAt?: boolean
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    date?: boolean
    totalUsers?: boolean
    paidUsers?: boolean
    activeUsers?: boolean
    newSignups?: boolean
    churnedUsers?: boolean
    createdAt?: boolean
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    connectionId?: boolean
    date?: boolean
    totalUsers?: boolean
    paidUsers?: boolean
    activeUsers?: boolean
    newSignups?: boolean
    churnedUsers?: boolean
    createdAt?: boolean
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["metricSnapshot"]>

  export type MetricSnapshotSelectScalar = {
    id?: boolean
    connectionId?: boolean
    date?: boolean
    totalUsers?: boolean
    paidUsers?: boolean
    activeUsers?: boolean
    newSignups?: boolean
    churnedUsers?: boolean
    createdAt?: boolean
  }

  export type MetricSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "connectionId" | "date" | "totalUsers" | "paidUsers" | "activeUsers" | "newSignups" | "churnedUsers" | "createdAt", ExtArgs["result"]["metricSnapshot"]>
  export type MetricSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }
  export type MetricSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }
  export type MetricSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DatabaseConnection?: boolean | DatabaseConnectionDefaultArgs<ExtArgs>
  }

  export type $MetricSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MetricSnapshot"
    objects: {
      DatabaseConnection: Prisma.$DatabaseConnectionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      connectionId: string
      date: Date
      totalUsers: number
      paidUsers: number
      activeUsers: number
      newSignups: number
      churnedUsers: number
      createdAt: Date
    }, ExtArgs["result"]["metricSnapshot"]>
    composites: {}
  }

  type MetricSnapshotGetPayload<S extends boolean | null | undefined | MetricSnapshotDefaultArgs> = $Result.GetResult<Prisma.$MetricSnapshotPayload, S>

  type MetricSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MetricSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MetricSnapshotCountAggregateInputType | true
    }

  export interface MetricSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MetricSnapshot'], meta: { name: 'MetricSnapshot' } }
    /**
     * Find zero or one MetricSnapshot that matches the filter.
     * @param {MetricSnapshotFindUniqueArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MetricSnapshotFindUniqueArgs>(args: SelectSubset<T, MetricSnapshotFindUniqueArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MetricSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MetricSnapshotFindUniqueOrThrowArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MetricSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MetricSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindFirstArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MetricSnapshotFindFirstArgs>(args?: SelectSubset<T, MetricSnapshotFindFirstArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MetricSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindFirstOrThrowArgs} args - Arguments to find a MetricSnapshot
     * @example
     * // Get one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MetricSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MetricSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MetricSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MetricSnapshots
     * const metricSnapshots = await prisma.metricSnapshot.findMany()
     * 
     * // Get first 10 MetricSnapshots
     * const metricSnapshots = await prisma.metricSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MetricSnapshotFindManyArgs>(args?: SelectSubset<T, MetricSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MetricSnapshot.
     * @param {MetricSnapshotCreateArgs} args - Arguments to create a MetricSnapshot.
     * @example
     * // Create one MetricSnapshot
     * const MetricSnapshot = await prisma.metricSnapshot.create({
     *   data: {
     *     // ... data to create a MetricSnapshot
     *   }
     * })
     * 
     */
    create<T extends MetricSnapshotCreateArgs>(args: SelectSubset<T, MetricSnapshotCreateArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MetricSnapshots.
     * @param {MetricSnapshotCreateManyArgs} args - Arguments to create many MetricSnapshots.
     * @example
     * // Create many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MetricSnapshotCreateManyArgs>(args?: SelectSubset<T, MetricSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MetricSnapshots and returns the data saved in the database.
     * @param {MetricSnapshotCreateManyAndReturnArgs} args - Arguments to create many MetricSnapshots.
     * @example
     * // Create many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MetricSnapshots and only return the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MetricSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, MetricSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MetricSnapshot.
     * @param {MetricSnapshotDeleteArgs} args - Arguments to delete one MetricSnapshot.
     * @example
     * // Delete one MetricSnapshot
     * const MetricSnapshot = await prisma.metricSnapshot.delete({
     *   where: {
     *     // ... filter to delete one MetricSnapshot
     *   }
     * })
     * 
     */
    delete<T extends MetricSnapshotDeleteArgs>(args: SelectSubset<T, MetricSnapshotDeleteArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MetricSnapshot.
     * @param {MetricSnapshotUpdateArgs} args - Arguments to update one MetricSnapshot.
     * @example
     * // Update one MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MetricSnapshotUpdateArgs>(args: SelectSubset<T, MetricSnapshotUpdateArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MetricSnapshots.
     * @param {MetricSnapshotDeleteManyArgs} args - Arguments to filter MetricSnapshots to delete.
     * @example
     * // Delete a few MetricSnapshots
     * const { count } = await prisma.metricSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MetricSnapshotDeleteManyArgs>(args?: SelectSubset<T, MetricSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MetricSnapshotUpdateManyArgs>(args: SelectSubset<T, MetricSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MetricSnapshots and returns the data updated in the database.
     * @param {MetricSnapshotUpdateManyAndReturnArgs} args - Arguments to update many MetricSnapshots.
     * @example
     * // Update many MetricSnapshots
     * const metricSnapshot = await prisma.metricSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MetricSnapshots and only return the `id`
     * const metricSnapshotWithIdOnly = await prisma.metricSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MetricSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, MetricSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MetricSnapshot.
     * @param {MetricSnapshotUpsertArgs} args - Arguments to update or create a MetricSnapshot.
     * @example
     * // Update or create a MetricSnapshot
     * const metricSnapshot = await prisma.metricSnapshot.upsert({
     *   create: {
     *     // ... data to create a MetricSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MetricSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MetricSnapshotUpsertArgs>(args: SelectSubset<T, MetricSnapshotUpsertArgs<ExtArgs>>): Prisma__MetricSnapshotClient<$Result.GetResult<Prisma.$MetricSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MetricSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotCountArgs} args - Arguments to filter MetricSnapshots to count.
     * @example
     * // Count the number of MetricSnapshots
     * const count = await prisma.metricSnapshot.count({
     *   where: {
     *     // ... the filter for the MetricSnapshots we want to count
     *   }
     * })
    **/
    count<T extends MetricSnapshotCountArgs>(
      args?: Subset<T, MetricSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MetricSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MetricSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MetricSnapshotAggregateArgs>(args: Subset<T, MetricSnapshotAggregateArgs>): Prisma.PrismaPromise<GetMetricSnapshotAggregateType<T>>

    /**
     * Group by MetricSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MetricSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MetricSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MetricSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MetricSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MetricSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetricSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MetricSnapshot model
   */
  readonly fields: MetricSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MetricSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MetricSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DatabaseConnection<T extends DatabaseConnectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DatabaseConnectionDefaultArgs<ExtArgs>>): Prisma__DatabaseConnectionClient<$Result.GetResult<Prisma.$DatabaseConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MetricSnapshot model
   */
  interface MetricSnapshotFieldRefs {
    readonly id: FieldRef<"MetricSnapshot", 'String'>
    readonly connectionId: FieldRef<"MetricSnapshot", 'String'>
    readonly date: FieldRef<"MetricSnapshot", 'DateTime'>
    readonly totalUsers: FieldRef<"MetricSnapshot", 'Int'>
    readonly paidUsers: FieldRef<"MetricSnapshot", 'Int'>
    readonly activeUsers: FieldRef<"MetricSnapshot", 'Int'>
    readonly newSignups: FieldRef<"MetricSnapshot", 'Int'>
    readonly churnedUsers: FieldRef<"MetricSnapshot", 'Int'>
    readonly createdAt: FieldRef<"MetricSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MetricSnapshot findUnique
   */
  export type MetricSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot findUniqueOrThrow
   */
  export type MetricSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot findFirst
   */
  export type MetricSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSnapshots.
     */
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot findFirstOrThrow
   */
  export type MetricSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MetricSnapshot to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MetricSnapshots.
     */
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot findMany
   */
  export type MetricSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which MetricSnapshots to fetch.
     */
    where?: MetricSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MetricSnapshots to fetch.
     */
    orderBy?: MetricSnapshotOrderByWithRelationInput | MetricSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MetricSnapshots.
     */
    cursor?: MetricSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MetricSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MetricSnapshots.
     */
    skip?: number
    distinct?: MetricSnapshotScalarFieldEnum | MetricSnapshotScalarFieldEnum[]
  }

  /**
   * MetricSnapshot create
   */
  export type MetricSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a MetricSnapshot.
     */
    data: XOR<MetricSnapshotCreateInput, MetricSnapshotUncheckedCreateInput>
  }

  /**
   * MetricSnapshot createMany
   */
  export type MetricSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MetricSnapshots.
     */
    data: MetricSnapshotCreateManyInput | MetricSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MetricSnapshot createManyAndReturn
   */
  export type MetricSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many MetricSnapshots.
     */
    data: MetricSnapshotCreateManyInput | MetricSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetricSnapshot update
   */
  export type MetricSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a MetricSnapshot.
     */
    data: XOR<MetricSnapshotUpdateInput, MetricSnapshotUncheckedUpdateInput>
    /**
     * Choose, which MetricSnapshot to update.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot updateMany
   */
  export type MetricSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MetricSnapshots.
     */
    data: XOR<MetricSnapshotUpdateManyMutationInput, MetricSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MetricSnapshots to update
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to update.
     */
    limit?: number
  }

  /**
   * MetricSnapshot updateManyAndReturn
   */
  export type MetricSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update MetricSnapshots.
     */
    data: XOR<MetricSnapshotUpdateManyMutationInput, MetricSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MetricSnapshots to update
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MetricSnapshot upsert
   */
  export type MetricSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the MetricSnapshot to update in case it exists.
     */
    where: MetricSnapshotWhereUniqueInput
    /**
     * In case the MetricSnapshot found by the `where` argument doesn't exist, create a new MetricSnapshot with this data.
     */
    create: XOR<MetricSnapshotCreateInput, MetricSnapshotUncheckedCreateInput>
    /**
     * In case the MetricSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MetricSnapshotUpdateInput, MetricSnapshotUncheckedUpdateInput>
  }

  /**
   * MetricSnapshot delete
   */
  export type MetricSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
    /**
     * Filter which MetricSnapshot to delete.
     */
    where: MetricSnapshotWhereUniqueInput
  }

  /**
   * MetricSnapshot deleteMany
   */
  export type MetricSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MetricSnapshots to delete
     */
    where?: MetricSnapshotWhereInput
    /**
     * Limit how many MetricSnapshots to delete.
     */
    limit?: number
  }

  /**
   * MetricSnapshot without action
   */
  export type MetricSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MetricSnapshot
     */
    select?: MetricSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MetricSnapshot
     */
    omit?: MetricSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MetricSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model Spotlight
   */

  export type AggregateSpotlight = {
    _count: SpotlightCountAggregateOutputType | null
    _avg: SpotlightAvgAggregateOutputType | null
    _sum: SpotlightSumAggregateOutputType | null
    _min: SpotlightMinAggregateOutputType | null
    _max: SpotlightMaxAggregateOutputType | null
  }

  export type SpotlightAvgAggregateOutputType = {
    position: number | null
    paymentAmount: number | null
  }

  export type SpotlightSumAggregateOutputType = {
    position: number | null
    paymentAmount: number | null
  }

  export type SpotlightMinAggregateOutputType = {
    id: string | null
    name: string | null
    tagline: string | null
    url: string | null
    logo: string | null
    position: number | null
    isActive: boolean | null
    expiresAt: Date | null
    stripePaymentIntentId: string | null
    stripeSessionId: string | null
    paymentAmount: number | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpotlightMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tagline: string | null
    url: string | null
    logo: string | null
    position: number | null
    isActive: boolean | null
    expiresAt: Date | null
    stripePaymentIntentId: string | null
    stripeSessionId: string | null
    paymentAmount: number | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SpotlightCountAggregateOutputType = {
    id: number
    name: number
    tagline: number
    url: number
    logo: number
    position: number
    isActive: number
    expiresAt: number
    stripePaymentIntentId: number
    stripeSessionId: number
    paymentAmount: number
    paidAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SpotlightAvgAggregateInputType = {
    position?: true
    paymentAmount?: true
  }

  export type SpotlightSumAggregateInputType = {
    position?: true
    paymentAmount?: true
  }

  export type SpotlightMinAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    url?: true
    logo?: true
    position?: true
    isActive?: true
    expiresAt?: true
    stripePaymentIntentId?: true
    stripeSessionId?: true
    paymentAmount?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpotlightMaxAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    url?: true
    logo?: true
    position?: true
    isActive?: true
    expiresAt?: true
    stripePaymentIntentId?: true
    stripeSessionId?: true
    paymentAmount?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SpotlightCountAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    url?: true
    logo?: true
    position?: true
    isActive?: true
    expiresAt?: true
    stripePaymentIntentId?: true
    stripeSessionId?: true
    paymentAmount?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SpotlightAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spotlight to aggregate.
     */
    where?: SpotlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spotlights to fetch.
     */
    orderBy?: SpotlightOrderByWithRelationInput | SpotlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpotlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spotlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spotlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spotlights
    **/
    _count?: true | SpotlightCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpotlightAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpotlightSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpotlightMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpotlightMaxAggregateInputType
  }

  export type GetSpotlightAggregateType<T extends SpotlightAggregateArgs> = {
        [P in keyof T & keyof AggregateSpotlight]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpotlight[P]>
      : GetScalarType<T[P], AggregateSpotlight[P]>
  }




  export type SpotlightGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpotlightWhereInput
    orderBy?: SpotlightOrderByWithAggregationInput | SpotlightOrderByWithAggregationInput[]
    by: SpotlightScalarFieldEnum[] | SpotlightScalarFieldEnum
    having?: SpotlightScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpotlightCountAggregateInputType | true
    _avg?: SpotlightAvgAggregateInputType
    _sum?: SpotlightSumAggregateInputType
    _min?: SpotlightMinAggregateInputType
    _max?: SpotlightMaxAggregateInputType
  }

  export type SpotlightGroupByOutputType = {
    id: string
    name: string
    tagline: string
    url: string
    logo: string | null
    position: number | null
    isActive: boolean
    expiresAt: Date | null
    stripePaymentIntentId: string | null
    stripeSessionId: string | null
    paymentAmount: number | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SpotlightCountAggregateOutputType | null
    _avg: SpotlightAvgAggregateOutputType | null
    _sum: SpotlightSumAggregateOutputType | null
    _min: SpotlightMinAggregateOutputType | null
    _max: SpotlightMaxAggregateOutputType | null
  }

  type GetSpotlightGroupByPayload<T extends SpotlightGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpotlightGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpotlightGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpotlightGroupByOutputType[P]>
            : GetScalarType<T[P], SpotlightGroupByOutputType[P]>
        }
      >
    >


  export type SpotlightSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    url?: boolean
    logo?: boolean
    position?: boolean
    isActive?: boolean
    expiresAt?: boolean
    stripePaymentIntentId?: boolean
    stripeSessionId?: boolean
    paymentAmount?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["spotlight"]>

  export type SpotlightSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    url?: boolean
    logo?: boolean
    position?: boolean
    isActive?: boolean
    expiresAt?: boolean
    stripePaymentIntentId?: boolean
    stripeSessionId?: boolean
    paymentAmount?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["spotlight"]>

  export type SpotlightSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    url?: boolean
    logo?: boolean
    position?: boolean
    isActive?: boolean
    expiresAt?: boolean
    stripePaymentIntentId?: boolean
    stripeSessionId?: boolean
    paymentAmount?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["spotlight"]>

  export type SpotlightSelectScalar = {
    id?: boolean
    name?: boolean
    tagline?: boolean
    url?: boolean
    logo?: boolean
    position?: boolean
    isActive?: boolean
    expiresAt?: boolean
    stripePaymentIntentId?: boolean
    stripeSessionId?: boolean
    paymentAmount?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SpotlightOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tagline" | "url" | "logo" | "position" | "isActive" | "expiresAt" | "stripePaymentIntentId" | "stripeSessionId" | "paymentAmount" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["spotlight"]>

  export type $SpotlightPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Spotlight"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tagline: string
      url: string
      logo: string | null
      position: number | null
      isActive: boolean
      expiresAt: Date | null
      stripePaymentIntentId: string | null
      stripeSessionId: string | null
      paymentAmount: number | null
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["spotlight"]>
    composites: {}
  }

  type SpotlightGetPayload<S extends boolean | null | undefined | SpotlightDefaultArgs> = $Result.GetResult<Prisma.$SpotlightPayload, S>

  type SpotlightCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpotlightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpotlightCountAggregateInputType | true
    }

  export interface SpotlightDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Spotlight'], meta: { name: 'Spotlight' } }
    /**
     * Find zero or one Spotlight that matches the filter.
     * @param {SpotlightFindUniqueArgs} args - Arguments to find a Spotlight
     * @example
     * // Get one Spotlight
     * const spotlight = await prisma.spotlight.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpotlightFindUniqueArgs>(args: SelectSubset<T, SpotlightFindUniqueArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Spotlight that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpotlightFindUniqueOrThrowArgs} args - Arguments to find a Spotlight
     * @example
     * // Get one Spotlight
     * const spotlight = await prisma.spotlight.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpotlightFindUniqueOrThrowArgs>(args: SelectSubset<T, SpotlightFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spotlight that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightFindFirstArgs} args - Arguments to find a Spotlight
     * @example
     * // Get one Spotlight
     * const spotlight = await prisma.spotlight.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpotlightFindFirstArgs>(args?: SelectSubset<T, SpotlightFindFirstArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Spotlight that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightFindFirstOrThrowArgs} args - Arguments to find a Spotlight
     * @example
     * // Get one Spotlight
     * const spotlight = await prisma.spotlight.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpotlightFindFirstOrThrowArgs>(args?: SelectSubset<T, SpotlightFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spotlights that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spotlights
     * const spotlights = await prisma.spotlight.findMany()
     * 
     * // Get first 10 Spotlights
     * const spotlights = await prisma.spotlight.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spotlightWithIdOnly = await prisma.spotlight.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpotlightFindManyArgs>(args?: SelectSubset<T, SpotlightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Spotlight.
     * @param {SpotlightCreateArgs} args - Arguments to create a Spotlight.
     * @example
     * // Create one Spotlight
     * const Spotlight = await prisma.spotlight.create({
     *   data: {
     *     // ... data to create a Spotlight
     *   }
     * })
     * 
     */
    create<T extends SpotlightCreateArgs>(args: SelectSubset<T, SpotlightCreateArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spotlights.
     * @param {SpotlightCreateManyArgs} args - Arguments to create many Spotlights.
     * @example
     * // Create many Spotlights
     * const spotlight = await prisma.spotlight.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpotlightCreateManyArgs>(args?: SelectSubset<T, SpotlightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spotlights and returns the data saved in the database.
     * @param {SpotlightCreateManyAndReturnArgs} args - Arguments to create many Spotlights.
     * @example
     * // Create many Spotlights
     * const spotlight = await prisma.spotlight.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spotlights and only return the `id`
     * const spotlightWithIdOnly = await prisma.spotlight.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpotlightCreateManyAndReturnArgs>(args?: SelectSubset<T, SpotlightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Spotlight.
     * @param {SpotlightDeleteArgs} args - Arguments to delete one Spotlight.
     * @example
     * // Delete one Spotlight
     * const Spotlight = await prisma.spotlight.delete({
     *   where: {
     *     // ... filter to delete one Spotlight
     *   }
     * })
     * 
     */
    delete<T extends SpotlightDeleteArgs>(args: SelectSubset<T, SpotlightDeleteArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Spotlight.
     * @param {SpotlightUpdateArgs} args - Arguments to update one Spotlight.
     * @example
     * // Update one Spotlight
     * const spotlight = await prisma.spotlight.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpotlightUpdateArgs>(args: SelectSubset<T, SpotlightUpdateArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spotlights.
     * @param {SpotlightDeleteManyArgs} args - Arguments to filter Spotlights to delete.
     * @example
     * // Delete a few Spotlights
     * const { count } = await prisma.spotlight.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpotlightDeleteManyArgs>(args?: SelectSubset<T, SpotlightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spotlights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spotlights
     * const spotlight = await prisma.spotlight.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpotlightUpdateManyArgs>(args: SelectSubset<T, SpotlightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spotlights and returns the data updated in the database.
     * @param {SpotlightUpdateManyAndReturnArgs} args - Arguments to update many Spotlights.
     * @example
     * // Update many Spotlights
     * const spotlight = await prisma.spotlight.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spotlights and only return the `id`
     * const spotlightWithIdOnly = await prisma.spotlight.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpotlightUpdateManyAndReturnArgs>(args: SelectSubset<T, SpotlightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Spotlight.
     * @param {SpotlightUpsertArgs} args - Arguments to update or create a Spotlight.
     * @example
     * // Update or create a Spotlight
     * const spotlight = await prisma.spotlight.upsert({
     *   create: {
     *     // ... data to create a Spotlight
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Spotlight we want to update
     *   }
     * })
     */
    upsert<T extends SpotlightUpsertArgs>(args: SelectSubset<T, SpotlightUpsertArgs<ExtArgs>>): Prisma__SpotlightClient<$Result.GetResult<Prisma.$SpotlightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spotlights.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightCountArgs} args - Arguments to filter Spotlights to count.
     * @example
     * // Count the number of Spotlights
     * const count = await prisma.spotlight.count({
     *   where: {
     *     // ... the filter for the Spotlights we want to count
     *   }
     * })
    **/
    count<T extends SpotlightCountArgs>(
      args?: Subset<T, SpotlightCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpotlightCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Spotlight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpotlightAggregateArgs>(args: Subset<T, SpotlightAggregateArgs>): Prisma.PrismaPromise<GetSpotlightAggregateType<T>>

    /**
     * Group by Spotlight.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpotlightGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpotlightGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpotlightGroupByArgs['orderBy'] }
        : { orderBy?: SpotlightGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpotlightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpotlightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Spotlight model
   */
  readonly fields: SpotlightFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Spotlight.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpotlightClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Spotlight model
   */
  interface SpotlightFieldRefs {
    readonly id: FieldRef<"Spotlight", 'String'>
    readonly name: FieldRef<"Spotlight", 'String'>
    readonly tagline: FieldRef<"Spotlight", 'String'>
    readonly url: FieldRef<"Spotlight", 'String'>
    readonly logo: FieldRef<"Spotlight", 'String'>
    readonly position: FieldRef<"Spotlight", 'Int'>
    readonly isActive: FieldRef<"Spotlight", 'Boolean'>
    readonly expiresAt: FieldRef<"Spotlight", 'DateTime'>
    readonly stripePaymentIntentId: FieldRef<"Spotlight", 'String'>
    readonly stripeSessionId: FieldRef<"Spotlight", 'String'>
    readonly paymentAmount: FieldRef<"Spotlight", 'Int'>
    readonly paidAt: FieldRef<"Spotlight", 'DateTime'>
    readonly createdAt: FieldRef<"Spotlight", 'DateTime'>
    readonly updatedAt: FieldRef<"Spotlight", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Spotlight findUnique
   */
  export type SpotlightFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter, which Spotlight to fetch.
     */
    where: SpotlightWhereUniqueInput
  }

  /**
   * Spotlight findUniqueOrThrow
   */
  export type SpotlightFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter, which Spotlight to fetch.
     */
    where: SpotlightWhereUniqueInput
  }

  /**
   * Spotlight findFirst
   */
  export type SpotlightFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter, which Spotlight to fetch.
     */
    where?: SpotlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spotlights to fetch.
     */
    orderBy?: SpotlightOrderByWithRelationInput | SpotlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spotlights.
     */
    cursor?: SpotlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spotlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spotlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spotlights.
     */
    distinct?: SpotlightScalarFieldEnum | SpotlightScalarFieldEnum[]
  }

  /**
   * Spotlight findFirstOrThrow
   */
  export type SpotlightFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter, which Spotlight to fetch.
     */
    where?: SpotlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spotlights to fetch.
     */
    orderBy?: SpotlightOrderByWithRelationInput | SpotlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spotlights.
     */
    cursor?: SpotlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spotlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spotlights.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spotlights.
     */
    distinct?: SpotlightScalarFieldEnum | SpotlightScalarFieldEnum[]
  }

  /**
   * Spotlight findMany
   */
  export type SpotlightFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter, which Spotlights to fetch.
     */
    where?: SpotlightWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spotlights to fetch.
     */
    orderBy?: SpotlightOrderByWithRelationInput | SpotlightOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spotlights.
     */
    cursor?: SpotlightWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spotlights from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spotlights.
     */
    skip?: number
    distinct?: SpotlightScalarFieldEnum | SpotlightScalarFieldEnum[]
  }

  /**
   * Spotlight create
   */
  export type SpotlightCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * The data needed to create a Spotlight.
     */
    data: XOR<SpotlightCreateInput, SpotlightUncheckedCreateInput>
  }

  /**
   * Spotlight createMany
   */
  export type SpotlightCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spotlights.
     */
    data: SpotlightCreateManyInput | SpotlightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Spotlight createManyAndReturn
   */
  export type SpotlightCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * The data used to create many Spotlights.
     */
    data: SpotlightCreateManyInput | SpotlightCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Spotlight update
   */
  export type SpotlightUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * The data needed to update a Spotlight.
     */
    data: XOR<SpotlightUpdateInput, SpotlightUncheckedUpdateInput>
    /**
     * Choose, which Spotlight to update.
     */
    where: SpotlightWhereUniqueInput
  }

  /**
   * Spotlight updateMany
   */
  export type SpotlightUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spotlights.
     */
    data: XOR<SpotlightUpdateManyMutationInput, SpotlightUncheckedUpdateManyInput>
    /**
     * Filter which Spotlights to update
     */
    where?: SpotlightWhereInput
    /**
     * Limit how many Spotlights to update.
     */
    limit?: number
  }

  /**
   * Spotlight updateManyAndReturn
   */
  export type SpotlightUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * The data used to update Spotlights.
     */
    data: XOR<SpotlightUpdateManyMutationInput, SpotlightUncheckedUpdateManyInput>
    /**
     * Filter which Spotlights to update
     */
    where?: SpotlightWhereInput
    /**
     * Limit how many Spotlights to update.
     */
    limit?: number
  }

  /**
   * Spotlight upsert
   */
  export type SpotlightUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * The filter to search for the Spotlight to update in case it exists.
     */
    where: SpotlightWhereUniqueInput
    /**
     * In case the Spotlight found by the `where` argument doesn't exist, create a new Spotlight with this data.
     */
    create: XOR<SpotlightCreateInput, SpotlightUncheckedCreateInput>
    /**
     * In case the Spotlight was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpotlightUpdateInput, SpotlightUncheckedUpdateInput>
  }

  /**
   * Spotlight delete
   */
  export type SpotlightDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
    /**
     * Filter which Spotlight to delete.
     */
    where: SpotlightWhereUniqueInput
  }

  /**
   * Spotlight deleteMany
   */
  export type SpotlightDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spotlights to delete
     */
    where?: SpotlightWhereInput
    /**
     * Limit how many Spotlights to delete.
     */
    limit?: number
  }

  /**
   * Spotlight without action
   */
  export type SpotlightDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Spotlight
     */
    select?: SpotlightSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Spotlight
     */
    omit?: SpotlightOmit<ExtArgs> | null
  }


  /**
   * Model DbCredential
   */

  export type AggregateDbCredential = {
    _count: DbCredentialCountAggregateOutputType | null
    _avg: DbCredentialAvgAggregateOutputType | null
    _sum: DbCredentialSumAggregateOutputType | null
    _min: DbCredentialMinAggregateOutputType | null
    _max: DbCredentialMaxAggregateOutputType | null
  }

  export type DbCredentialAvgAggregateOutputType = {
    port: number | null
  }

  export type DbCredentialSumAggregateOutputType = {
    port: number | null
  }

  export type DbCredentialMinAggregateOutputType = {
    id: string | null
    host: string | null
    port: number | null
    database: string | null
    username: string | null
    password: string | null
    ssl: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbCredentialMaxAggregateOutputType = {
    id: string | null
    host: string | null
    port: number | null
    database: string | null
    username: string | null
    password: string | null
    ssl: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DbCredentialCountAggregateOutputType = {
    id: number
    host: number
    port: number
    database: number
    username: number
    password: number
    ssl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DbCredentialAvgAggregateInputType = {
    port?: true
  }

  export type DbCredentialSumAggregateInputType = {
    port?: true
  }

  export type DbCredentialMinAggregateInputType = {
    id?: true
    host?: true
    port?: true
    database?: true
    username?: true
    password?: true
    ssl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbCredentialMaxAggregateInputType = {
    id?: true
    host?: true
    port?: true
    database?: true
    username?: true
    password?: true
    ssl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DbCredentialCountAggregateInputType = {
    id?: true
    host?: true
    port?: true
    database?: true
    username?: true
    password?: true
    ssl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DbCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DbCredential to aggregate.
     */
    where?: DbCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCredentials to fetch.
     */
    orderBy?: DbCredentialOrderByWithRelationInput | DbCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DbCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DbCredentials
    **/
    _count?: true | DbCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DbCredentialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DbCredentialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DbCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DbCredentialMaxAggregateInputType
  }

  export type GetDbCredentialAggregateType<T extends DbCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateDbCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDbCredential[P]>
      : GetScalarType<T[P], AggregateDbCredential[P]>
  }




  export type DbCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DbCredentialWhereInput
    orderBy?: DbCredentialOrderByWithAggregationInput | DbCredentialOrderByWithAggregationInput[]
    by: DbCredentialScalarFieldEnum[] | DbCredentialScalarFieldEnum
    having?: DbCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DbCredentialCountAggregateInputType | true
    _avg?: DbCredentialAvgAggregateInputType
    _sum?: DbCredentialSumAggregateInputType
    _min?: DbCredentialMinAggregateInputType
    _max?: DbCredentialMaxAggregateInputType
  }

  export type DbCredentialGroupByOutputType = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl: boolean
    createdAt: Date
    updatedAt: Date
    _count: DbCredentialCountAggregateOutputType | null
    _avg: DbCredentialAvgAggregateOutputType | null
    _sum: DbCredentialSumAggregateOutputType | null
    _min: DbCredentialMinAggregateOutputType | null
    _max: DbCredentialMaxAggregateOutputType | null
  }

  type GetDbCredentialGroupByPayload<T extends DbCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DbCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DbCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DbCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], DbCredentialGroupByOutputType[P]>
        }
      >
    >


  export type DbCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    host?: boolean
    port?: boolean
    database?: boolean
    username?: boolean
    password?: boolean
    ssl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Startup?: boolean | DbCredential$StartupArgs<ExtArgs>
    _count?: boolean | DbCredentialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dbCredential"]>

  export type DbCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    host?: boolean
    port?: boolean
    database?: boolean
    username?: boolean
    password?: boolean
    ssl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dbCredential"]>

  export type DbCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    host?: boolean
    port?: boolean
    database?: boolean
    username?: boolean
    password?: boolean
    ssl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dbCredential"]>

  export type DbCredentialSelectScalar = {
    id?: boolean
    host?: boolean
    port?: boolean
    database?: boolean
    username?: boolean
    password?: boolean
    ssl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DbCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "host" | "port" | "database" | "username" | "password" | "ssl" | "createdAt" | "updatedAt", ExtArgs["result"]["dbCredential"]>
  export type DbCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Startup?: boolean | DbCredential$StartupArgs<ExtArgs>
    _count?: boolean | DbCredentialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DbCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DbCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DbCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DbCredential"
    objects: {
      Startup: Prisma.$StartupPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      host: string
      port: number
      database: string
      username: string
      password: string
      ssl: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dbCredential"]>
    composites: {}
  }

  type DbCredentialGetPayload<S extends boolean | null | undefined | DbCredentialDefaultArgs> = $Result.GetResult<Prisma.$DbCredentialPayload, S>

  type DbCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DbCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DbCredentialCountAggregateInputType | true
    }

  export interface DbCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DbCredential'], meta: { name: 'DbCredential' } }
    /**
     * Find zero or one DbCredential that matches the filter.
     * @param {DbCredentialFindUniqueArgs} args - Arguments to find a DbCredential
     * @example
     * // Get one DbCredential
     * const dbCredential = await prisma.dbCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DbCredentialFindUniqueArgs>(args: SelectSubset<T, DbCredentialFindUniqueArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DbCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DbCredentialFindUniqueOrThrowArgs} args - Arguments to find a DbCredential
     * @example
     * // Get one DbCredential
     * const dbCredential = await prisma.dbCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DbCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, DbCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DbCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialFindFirstArgs} args - Arguments to find a DbCredential
     * @example
     * // Get one DbCredential
     * const dbCredential = await prisma.dbCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DbCredentialFindFirstArgs>(args?: SelectSubset<T, DbCredentialFindFirstArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DbCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialFindFirstOrThrowArgs} args - Arguments to find a DbCredential
     * @example
     * // Get one DbCredential
     * const dbCredential = await prisma.dbCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DbCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, DbCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DbCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DbCredentials
     * const dbCredentials = await prisma.dbCredential.findMany()
     * 
     * // Get first 10 DbCredentials
     * const dbCredentials = await prisma.dbCredential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dbCredentialWithIdOnly = await prisma.dbCredential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DbCredentialFindManyArgs>(args?: SelectSubset<T, DbCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DbCredential.
     * @param {DbCredentialCreateArgs} args - Arguments to create a DbCredential.
     * @example
     * // Create one DbCredential
     * const DbCredential = await prisma.dbCredential.create({
     *   data: {
     *     // ... data to create a DbCredential
     *   }
     * })
     * 
     */
    create<T extends DbCredentialCreateArgs>(args: SelectSubset<T, DbCredentialCreateArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DbCredentials.
     * @param {DbCredentialCreateManyArgs} args - Arguments to create many DbCredentials.
     * @example
     * // Create many DbCredentials
     * const dbCredential = await prisma.dbCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DbCredentialCreateManyArgs>(args?: SelectSubset<T, DbCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DbCredentials and returns the data saved in the database.
     * @param {DbCredentialCreateManyAndReturnArgs} args - Arguments to create many DbCredentials.
     * @example
     * // Create many DbCredentials
     * const dbCredential = await prisma.dbCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DbCredentials and only return the `id`
     * const dbCredentialWithIdOnly = await prisma.dbCredential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DbCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, DbCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DbCredential.
     * @param {DbCredentialDeleteArgs} args - Arguments to delete one DbCredential.
     * @example
     * // Delete one DbCredential
     * const DbCredential = await prisma.dbCredential.delete({
     *   where: {
     *     // ... filter to delete one DbCredential
     *   }
     * })
     * 
     */
    delete<T extends DbCredentialDeleteArgs>(args: SelectSubset<T, DbCredentialDeleteArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DbCredential.
     * @param {DbCredentialUpdateArgs} args - Arguments to update one DbCredential.
     * @example
     * // Update one DbCredential
     * const dbCredential = await prisma.dbCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DbCredentialUpdateArgs>(args: SelectSubset<T, DbCredentialUpdateArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DbCredentials.
     * @param {DbCredentialDeleteManyArgs} args - Arguments to filter DbCredentials to delete.
     * @example
     * // Delete a few DbCredentials
     * const { count } = await prisma.dbCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DbCredentialDeleteManyArgs>(args?: SelectSubset<T, DbCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DbCredentials
     * const dbCredential = await prisma.dbCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DbCredentialUpdateManyArgs>(args: SelectSubset<T, DbCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DbCredentials and returns the data updated in the database.
     * @param {DbCredentialUpdateManyAndReturnArgs} args - Arguments to update many DbCredentials.
     * @example
     * // Update many DbCredentials
     * const dbCredential = await prisma.dbCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DbCredentials and only return the `id`
     * const dbCredentialWithIdOnly = await prisma.dbCredential.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DbCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, DbCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DbCredential.
     * @param {DbCredentialUpsertArgs} args - Arguments to update or create a DbCredential.
     * @example
     * // Update or create a DbCredential
     * const dbCredential = await prisma.dbCredential.upsert({
     *   create: {
     *     // ... data to create a DbCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DbCredential we want to update
     *   }
     * })
     */
    upsert<T extends DbCredentialUpsertArgs>(args: SelectSubset<T, DbCredentialUpsertArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DbCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialCountArgs} args - Arguments to filter DbCredentials to count.
     * @example
     * // Count the number of DbCredentials
     * const count = await prisma.dbCredential.count({
     *   where: {
     *     // ... the filter for the DbCredentials we want to count
     *   }
     * })
    **/
    count<T extends DbCredentialCountArgs>(
      args?: Subset<T, DbCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DbCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DbCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DbCredentialAggregateArgs>(args: Subset<T, DbCredentialAggregateArgs>): Prisma.PrismaPromise<GetDbCredentialAggregateType<T>>

    /**
     * Group by DbCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DbCredentialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DbCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DbCredentialGroupByArgs['orderBy'] }
        : { orderBy?: DbCredentialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DbCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDbCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DbCredential model
   */
  readonly fields: DbCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DbCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DbCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Startup<T extends DbCredential$StartupArgs<ExtArgs> = {}>(args?: Subset<T, DbCredential$StartupArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DbCredential model
   */
  interface DbCredentialFieldRefs {
    readonly id: FieldRef<"DbCredential", 'String'>
    readonly host: FieldRef<"DbCredential", 'String'>
    readonly port: FieldRef<"DbCredential", 'Int'>
    readonly database: FieldRef<"DbCredential", 'String'>
    readonly username: FieldRef<"DbCredential", 'String'>
    readonly password: FieldRef<"DbCredential", 'String'>
    readonly ssl: FieldRef<"DbCredential", 'Boolean'>
    readonly createdAt: FieldRef<"DbCredential", 'DateTime'>
    readonly updatedAt: FieldRef<"DbCredential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DbCredential findUnique
   */
  export type DbCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter, which DbCredential to fetch.
     */
    where: DbCredentialWhereUniqueInput
  }

  /**
   * DbCredential findUniqueOrThrow
   */
  export type DbCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter, which DbCredential to fetch.
     */
    where: DbCredentialWhereUniqueInput
  }

  /**
   * DbCredential findFirst
   */
  export type DbCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter, which DbCredential to fetch.
     */
    where?: DbCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCredentials to fetch.
     */
    orderBy?: DbCredentialOrderByWithRelationInput | DbCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbCredentials.
     */
    cursor?: DbCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbCredentials.
     */
    distinct?: DbCredentialScalarFieldEnum | DbCredentialScalarFieldEnum[]
  }

  /**
   * DbCredential findFirstOrThrow
   */
  export type DbCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter, which DbCredential to fetch.
     */
    where?: DbCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCredentials to fetch.
     */
    orderBy?: DbCredentialOrderByWithRelationInput | DbCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DbCredentials.
     */
    cursor?: DbCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DbCredentials.
     */
    distinct?: DbCredentialScalarFieldEnum | DbCredentialScalarFieldEnum[]
  }

  /**
   * DbCredential findMany
   */
  export type DbCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter, which DbCredentials to fetch.
     */
    where?: DbCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DbCredentials to fetch.
     */
    orderBy?: DbCredentialOrderByWithRelationInput | DbCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DbCredentials.
     */
    cursor?: DbCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DbCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DbCredentials.
     */
    skip?: number
    distinct?: DbCredentialScalarFieldEnum | DbCredentialScalarFieldEnum[]
  }

  /**
   * DbCredential create
   */
  export type DbCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a DbCredential.
     */
    data: XOR<DbCredentialCreateInput, DbCredentialUncheckedCreateInput>
  }

  /**
   * DbCredential createMany
   */
  export type DbCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DbCredentials.
     */
    data: DbCredentialCreateManyInput | DbCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DbCredential createManyAndReturn
   */
  export type DbCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many DbCredentials.
     */
    data: DbCredentialCreateManyInput | DbCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DbCredential update
   */
  export type DbCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a DbCredential.
     */
    data: XOR<DbCredentialUpdateInput, DbCredentialUncheckedUpdateInput>
    /**
     * Choose, which DbCredential to update.
     */
    where: DbCredentialWhereUniqueInput
  }

  /**
   * DbCredential updateMany
   */
  export type DbCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DbCredentials.
     */
    data: XOR<DbCredentialUpdateManyMutationInput, DbCredentialUncheckedUpdateManyInput>
    /**
     * Filter which DbCredentials to update
     */
    where?: DbCredentialWhereInput
    /**
     * Limit how many DbCredentials to update.
     */
    limit?: number
  }

  /**
   * DbCredential updateManyAndReturn
   */
  export type DbCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * The data used to update DbCredentials.
     */
    data: XOR<DbCredentialUpdateManyMutationInput, DbCredentialUncheckedUpdateManyInput>
    /**
     * Filter which DbCredentials to update
     */
    where?: DbCredentialWhereInput
    /**
     * Limit how many DbCredentials to update.
     */
    limit?: number
  }

  /**
   * DbCredential upsert
   */
  export type DbCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the DbCredential to update in case it exists.
     */
    where: DbCredentialWhereUniqueInput
    /**
     * In case the DbCredential found by the `where` argument doesn't exist, create a new DbCredential with this data.
     */
    create: XOR<DbCredentialCreateInput, DbCredentialUncheckedCreateInput>
    /**
     * In case the DbCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DbCredentialUpdateInput, DbCredentialUncheckedUpdateInput>
  }

  /**
   * DbCredential delete
   */
  export type DbCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
    /**
     * Filter which DbCredential to delete.
     */
    where: DbCredentialWhereUniqueInput
  }

  /**
   * DbCredential deleteMany
   */
  export type DbCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DbCredentials to delete
     */
    where?: DbCredentialWhereInput
    /**
     * Limit how many DbCredentials to delete.
     */
    limit?: number
  }

  /**
   * DbCredential.Startup
   */
  export type DbCredential$StartupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    where?: StartupWhereInput
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    cursor?: StartupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * DbCredential without action
   */
  export type DbCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DbCredential
     */
    select?: DbCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DbCredential
     */
    omit?: DbCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DbCredentialInclude<ExtArgs> | null
  }


  /**
   * Model Startup
   */

  export type AggregateStartup = {
    _count: StartupCountAggregateOutputType | null
    _min: StartupMinAggregateOutputType | null
    _max: StartupMaxAggregateOutputType | null
  }

  export type StartupMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    logoUrl: string | null
    provider: string | null
    credentialsId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StartupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    logoUrl: string | null
    provider: string | null
    credentialsId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StartupCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    logoUrl: number
    provider: number
    credentialsId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StartupMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logoUrl?: true
    provider?: true
    credentialsId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StartupMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logoUrl?: true
    provider?: true
    credentialsId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StartupCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logoUrl?: true
    provider?: true
    credentialsId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StartupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Startup to aggregate.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Startups
    **/
    _count?: true | StartupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StartupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StartupMaxAggregateInputType
  }

  export type GetStartupAggregateType<T extends StartupAggregateArgs> = {
        [P in keyof T & keyof AggregateStartup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStartup[P]>
      : GetScalarType<T[P], AggregateStartup[P]>
  }




  export type StartupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StartupWhereInput
    orderBy?: StartupOrderByWithAggregationInput | StartupOrderByWithAggregationInput[]
    by: StartupScalarFieldEnum[] | StartupScalarFieldEnum
    having?: StartupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StartupCountAggregateInputType | true
    _min?: StartupMinAggregateInputType
    _max?: StartupMaxAggregateInputType
  }

  export type StartupGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    logoUrl: string | null
    provider: string
    credentialsId: string
    createdAt: Date
    updatedAt: Date
    _count: StartupCountAggregateOutputType | null
    _min: StartupMinAggregateOutputType | null
    _max: StartupMaxAggregateOutputType | null
  }

  type GetStartupGroupByPayload<T extends StartupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StartupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StartupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StartupGroupByOutputType[P]>
            : GetScalarType<T[P], StartupGroupByOutputType[P]>
        }
      >
    >


  export type StartupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logoUrl?: boolean
    provider?: boolean
    credentialsId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logoUrl?: boolean
    provider?: boolean
    credentialsId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logoUrl?: boolean
    provider?: boolean
    credentialsId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["startup"]>

  export type StartupSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logoUrl?: boolean
    provider?: boolean
    credentialsId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StartupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "logoUrl" | "provider" | "credentialsId" | "createdAt" | "updatedAt", ExtArgs["result"]["startup"]>
  export type StartupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }
  export type StartupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }
  export type StartupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DbCredential?: boolean | DbCredentialDefaultArgs<ExtArgs>
  }

  export type $StartupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Startup"
    objects: {
      DbCredential: Prisma.$DbCredentialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      logoUrl: string | null
      provider: string
      credentialsId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["startup"]>
    composites: {}
  }

  type StartupGetPayload<S extends boolean | null | undefined | StartupDefaultArgs> = $Result.GetResult<Prisma.$StartupPayload, S>

  type StartupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StartupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StartupCountAggregateInputType | true
    }

  export interface StartupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Startup'], meta: { name: 'Startup' } }
    /**
     * Find zero or one Startup that matches the filter.
     * @param {StartupFindUniqueArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StartupFindUniqueArgs>(args: SelectSubset<T, StartupFindUniqueArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Startup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StartupFindUniqueOrThrowArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StartupFindUniqueOrThrowArgs>(args: SelectSubset<T, StartupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Startup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindFirstArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StartupFindFirstArgs>(args?: SelectSubset<T, StartupFindFirstArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Startup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindFirstOrThrowArgs} args - Arguments to find a Startup
     * @example
     * // Get one Startup
     * const startup = await prisma.startup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StartupFindFirstOrThrowArgs>(args?: SelectSubset<T, StartupFindFirstOrThrowArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Startups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Startups
     * const startups = await prisma.startup.findMany()
     * 
     * // Get first 10 Startups
     * const startups = await prisma.startup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const startupWithIdOnly = await prisma.startup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StartupFindManyArgs>(args?: SelectSubset<T, StartupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Startup.
     * @param {StartupCreateArgs} args - Arguments to create a Startup.
     * @example
     * // Create one Startup
     * const Startup = await prisma.startup.create({
     *   data: {
     *     // ... data to create a Startup
     *   }
     * })
     * 
     */
    create<T extends StartupCreateArgs>(args: SelectSubset<T, StartupCreateArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Startups.
     * @param {StartupCreateManyArgs} args - Arguments to create many Startups.
     * @example
     * // Create many Startups
     * const startup = await prisma.startup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StartupCreateManyArgs>(args?: SelectSubset<T, StartupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Startups and returns the data saved in the database.
     * @param {StartupCreateManyAndReturnArgs} args - Arguments to create many Startups.
     * @example
     * // Create many Startups
     * const startup = await prisma.startup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Startups and only return the `id`
     * const startupWithIdOnly = await prisma.startup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StartupCreateManyAndReturnArgs>(args?: SelectSubset<T, StartupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Startup.
     * @param {StartupDeleteArgs} args - Arguments to delete one Startup.
     * @example
     * // Delete one Startup
     * const Startup = await prisma.startup.delete({
     *   where: {
     *     // ... filter to delete one Startup
     *   }
     * })
     * 
     */
    delete<T extends StartupDeleteArgs>(args: SelectSubset<T, StartupDeleteArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Startup.
     * @param {StartupUpdateArgs} args - Arguments to update one Startup.
     * @example
     * // Update one Startup
     * const startup = await prisma.startup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StartupUpdateArgs>(args: SelectSubset<T, StartupUpdateArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Startups.
     * @param {StartupDeleteManyArgs} args - Arguments to filter Startups to delete.
     * @example
     * // Delete a few Startups
     * const { count } = await prisma.startup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StartupDeleteManyArgs>(args?: SelectSubset<T, StartupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Startups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Startups
     * const startup = await prisma.startup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StartupUpdateManyArgs>(args: SelectSubset<T, StartupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Startups and returns the data updated in the database.
     * @param {StartupUpdateManyAndReturnArgs} args - Arguments to update many Startups.
     * @example
     * // Update many Startups
     * const startup = await prisma.startup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Startups and only return the `id`
     * const startupWithIdOnly = await prisma.startup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StartupUpdateManyAndReturnArgs>(args: SelectSubset<T, StartupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Startup.
     * @param {StartupUpsertArgs} args - Arguments to update or create a Startup.
     * @example
     * // Update or create a Startup
     * const startup = await prisma.startup.upsert({
     *   create: {
     *     // ... data to create a Startup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Startup we want to update
     *   }
     * })
     */
    upsert<T extends StartupUpsertArgs>(args: SelectSubset<T, StartupUpsertArgs<ExtArgs>>): Prisma__StartupClient<$Result.GetResult<Prisma.$StartupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Startups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupCountArgs} args - Arguments to filter Startups to count.
     * @example
     * // Count the number of Startups
     * const count = await prisma.startup.count({
     *   where: {
     *     // ... the filter for the Startups we want to count
     *   }
     * })
    **/
    count<T extends StartupCountArgs>(
      args?: Subset<T, StartupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StartupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Startup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StartupAggregateArgs>(args: Subset<T, StartupAggregateArgs>): Prisma.PrismaPromise<GetStartupAggregateType<T>>

    /**
     * Group by Startup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StartupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StartupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StartupGroupByArgs['orderBy'] }
        : { orderBy?: StartupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StartupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStartupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Startup model
   */
  readonly fields: StartupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Startup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StartupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DbCredential<T extends DbCredentialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DbCredentialDefaultArgs<ExtArgs>>): Prisma__DbCredentialClient<$Result.GetResult<Prisma.$DbCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Startup model
   */
  interface StartupFieldRefs {
    readonly id: FieldRef<"Startup", 'String'>
    readonly name: FieldRef<"Startup", 'String'>
    readonly slug: FieldRef<"Startup", 'String'>
    readonly description: FieldRef<"Startup", 'String'>
    readonly logoUrl: FieldRef<"Startup", 'String'>
    readonly provider: FieldRef<"Startup", 'String'>
    readonly credentialsId: FieldRef<"Startup", 'String'>
    readonly createdAt: FieldRef<"Startup", 'DateTime'>
    readonly updatedAt: FieldRef<"Startup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Startup findUnique
   */
  export type StartupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup findUniqueOrThrow
   */
  export type StartupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup findFirst
   */
  export type StartupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Startups.
     */
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup findFirstOrThrow
   */
  export type StartupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startup to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Startups.
     */
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup findMany
   */
  export type StartupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter, which Startups to fetch.
     */
    where?: StartupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Startups to fetch.
     */
    orderBy?: StartupOrderByWithRelationInput | StartupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Startups.
     */
    cursor?: StartupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Startups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Startups.
     */
    skip?: number
    distinct?: StartupScalarFieldEnum | StartupScalarFieldEnum[]
  }

  /**
   * Startup create
   */
  export type StartupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The data needed to create a Startup.
     */
    data: XOR<StartupCreateInput, StartupUncheckedCreateInput>
  }

  /**
   * Startup createMany
   */
  export type StartupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Startups.
     */
    data: StartupCreateManyInput | StartupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Startup createManyAndReturn
   */
  export type StartupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * The data used to create many Startups.
     */
    data: StartupCreateManyInput | StartupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Startup update
   */
  export type StartupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The data needed to update a Startup.
     */
    data: XOR<StartupUpdateInput, StartupUncheckedUpdateInput>
    /**
     * Choose, which Startup to update.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup updateMany
   */
  export type StartupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Startups.
     */
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyInput>
    /**
     * Filter which Startups to update
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to update.
     */
    limit?: number
  }

  /**
   * Startup updateManyAndReturn
   */
  export type StartupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * The data used to update Startups.
     */
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyInput>
    /**
     * Filter which Startups to update
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Startup upsert
   */
  export type StartupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * The filter to search for the Startup to update in case it exists.
     */
    where: StartupWhereUniqueInput
    /**
     * In case the Startup found by the `where` argument doesn't exist, create a new Startup with this data.
     */
    create: XOR<StartupCreateInput, StartupUncheckedCreateInput>
    /**
     * In case the Startup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StartupUpdateInput, StartupUncheckedUpdateInput>
  }

  /**
   * Startup delete
   */
  export type StartupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
    /**
     * Filter which Startup to delete.
     */
    where: StartupWhereUniqueInput
  }

  /**
   * Startup deleteMany
   */
  export type StartupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Startups to delete
     */
    where?: StartupWhereInput
    /**
     * Limit how many Startups to delete.
     */
    limit?: number
  }

  /**
   * Startup without action
   */
  export type StartupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Startup
     */
    select?: StartupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Startup
     */
    omit?: StartupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StartupInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DatabaseConnectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    provider: 'provider',
    connectionString: 'connectionString',
    selectedTables: 'selectedTables',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    startupName: 'startupName',
    slug: 'slug',
    paidUsers: 'paidUsers',
    totalUsers: 'totalUsers',
    category: 'category',
    description: 'description',
    founderAvatar: 'founderAvatar',
    founderHandle: 'founderHandle',
    founderName: 'founderName',
    logo: 'logo',
    tagline: 'tagline',
    website: 'website',
    readOnlyConnString: 'readOnlyConnString',
    readOnlyRoleName: 'readOnlyRoleName'
  };

  export type DatabaseConnectionScalarFieldEnum = (typeof DatabaseConnectionScalarFieldEnum)[keyof typeof DatabaseConnectionScalarFieldEnum]


  export const MetricSnapshotScalarFieldEnum: {
    id: 'id',
    connectionId: 'connectionId',
    date: 'date',
    totalUsers: 'totalUsers',
    paidUsers: 'paidUsers',
    activeUsers: 'activeUsers',
    newSignups: 'newSignups',
    churnedUsers: 'churnedUsers',
    createdAt: 'createdAt'
  };

  export type MetricSnapshotScalarFieldEnum = (typeof MetricSnapshotScalarFieldEnum)[keyof typeof MetricSnapshotScalarFieldEnum]


  export const SpotlightScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tagline: 'tagline',
    url: 'url',
    logo: 'logo',
    position: 'position',
    isActive: 'isActive',
    expiresAt: 'expiresAt',
    stripePaymentIntentId: 'stripePaymentIntentId',
    stripeSessionId: 'stripeSessionId',
    paymentAmount: 'paymentAmount',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SpotlightScalarFieldEnum = (typeof SpotlightScalarFieldEnum)[keyof typeof SpotlightScalarFieldEnum]


  export const DbCredentialScalarFieldEnum: {
    id: 'id',
    host: 'host',
    port: 'port',
    database: 'database',
    username: 'username',
    password: 'password',
    ssl: 'ssl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DbCredentialScalarFieldEnum = (typeof DbCredentialScalarFieldEnum)[keyof typeof DbCredentialScalarFieldEnum]


  export const StartupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    logoUrl: 'logoUrl',
    provider: 'provider',
    credentialsId: 'credentialsId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StartupScalarFieldEnum = (typeof StartupScalarFieldEnum)[keyof typeof StartupScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DatabaseConnectionWhereInput = {
    AND?: DatabaseConnectionWhereInput | DatabaseConnectionWhereInput[]
    OR?: DatabaseConnectionWhereInput[]
    NOT?: DatabaseConnectionWhereInput | DatabaseConnectionWhereInput[]
    id?: StringFilter<"DatabaseConnection"> | string
    name?: StringFilter<"DatabaseConnection"> | string
    provider?: StringFilter<"DatabaseConnection"> | string
    connectionString?: StringFilter<"DatabaseConnection"> | string
    selectedTables?: StringNullableListFilter<"DatabaseConnection">
    createdAt?: DateTimeFilter<"DatabaseConnection"> | Date | string
    updatedAt?: DateTimeFilter<"DatabaseConnection"> | Date | string
    startupName?: StringFilter<"DatabaseConnection"> | string
    slug?: StringNullableFilter<"DatabaseConnection"> | string | null
    paidUsers?: IntNullableFilter<"DatabaseConnection"> | number | null
    totalUsers?: IntNullableFilter<"DatabaseConnection"> | number | null
    category?: StringNullableFilter<"DatabaseConnection"> | string | null
    description?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderAvatar?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderHandle?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderName?: StringNullableFilter<"DatabaseConnection"> | string | null
    logo?: StringNullableFilter<"DatabaseConnection"> | string | null
    tagline?: StringNullableFilter<"DatabaseConnection"> | string | null
    website?: StringNullableFilter<"DatabaseConnection"> | string | null
    readOnlyConnString?: StringNullableFilter<"DatabaseConnection"> | string | null
    readOnlyRoleName?: StringNullableFilter<"DatabaseConnection"> | string | null
    MetricSnapshot?: MetricSnapshotListRelationFilter
  }

  export type DatabaseConnectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    connectionString?: SortOrder
    selectedTables?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startupName?: SortOrder
    slug?: SortOrderInput | SortOrder
    paidUsers?: SortOrderInput | SortOrder
    totalUsers?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    founderAvatar?: SortOrderInput | SortOrder
    founderHandle?: SortOrderInput | SortOrder
    founderName?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    tagline?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    readOnlyConnString?: SortOrderInput | SortOrder
    readOnlyRoleName?: SortOrderInput | SortOrder
    MetricSnapshot?: MetricSnapshotOrderByRelationAggregateInput
  }

  export type DatabaseConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: DatabaseConnectionWhereInput | DatabaseConnectionWhereInput[]
    OR?: DatabaseConnectionWhereInput[]
    NOT?: DatabaseConnectionWhereInput | DatabaseConnectionWhereInput[]
    name?: StringFilter<"DatabaseConnection"> | string
    provider?: StringFilter<"DatabaseConnection"> | string
    connectionString?: StringFilter<"DatabaseConnection"> | string
    selectedTables?: StringNullableListFilter<"DatabaseConnection">
    createdAt?: DateTimeFilter<"DatabaseConnection"> | Date | string
    updatedAt?: DateTimeFilter<"DatabaseConnection"> | Date | string
    startupName?: StringFilter<"DatabaseConnection"> | string
    paidUsers?: IntNullableFilter<"DatabaseConnection"> | number | null
    totalUsers?: IntNullableFilter<"DatabaseConnection"> | number | null
    category?: StringNullableFilter<"DatabaseConnection"> | string | null
    description?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderAvatar?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderHandle?: StringNullableFilter<"DatabaseConnection"> | string | null
    founderName?: StringNullableFilter<"DatabaseConnection"> | string | null
    logo?: StringNullableFilter<"DatabaseConnection"> | string | null
    tagline?: StringNullableFilter<"DatabaseConnection"> | string | null
    website?: StringNullableFilter<"DatabaseConnection"> | string | null
    readOnlyConnString?: StringNullableFilter<"DatabaseConnection"> | string | null
    readOnlyRoleName?: StringNullableFilter<"DatabaseConnection"> | string | null
    MetricSnapshot?: MetricSnapshotListRelationFilter
  }, "id" | "slug">

  export type DatabaseConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    connectionString?: SortOrder
    selectedTables?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startupName?: SortOrder
    slug?: SortOrderInput | SortOrder
    paidUsers?: SortOrderInput | SortOrder
    totalUsers?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    founderAvatar?: SortOrderInput | SortOrder
    founderHandle?: SortOrderInput | SortOrder
    founderName?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    tagline?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    readOnlyConnString?: SortOrderInput | SortOrder
    readOnlyRoleName?: SortOrderInput | SortOrder
    _count?: DatabaseConnectionCountOrderByAggregateInput
    _avg?: DatabaseConnectionAvgOrderByAggregateInput
    _max?: DatabaseConnectionMaxOrderByAggregateInput
    _min?: DatabaseConnectionMinOrderByAggregateInput
    _sum?: DatabaseConnectionSumOrderByAggregateInput
  }

  export type DatabaseConnectionScalarWhereWithAggregatesInput = {
    AND?: DatabaseConnectionScalarWhereWithAggregatesInput | DatabaseConnectionScalarWhereWithAggregatesInput[]
    OR?: DatabaseConnectionScalarWhereWithAggregatesInput[]
    NOT?: DatabaseConnectionScalarWhereWithAggregatesInput | DatabaseConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DatabaseConnection"> | string
    name?: StringWithAggregatesFilter<"DatabaseConnection"> | string
    provider?: StringWithAggregatesFilter<"DatabaseConnection"> | string
    connectionString?: StringWithAggregatesFilter<"DatabaseConnection"> | string
    selectedTables?: StringNullableListFilter<"DatabaseConnection">
    createdAt?: DateTimeWithAggregatesFilter<"DatabaseConnection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DatabaseConnection"> | Date | string
    startupName?: StringWithAggregatesFilter<"DatabaseConnection"> | string
    slug?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    paidUsers?: IntNullableWithAggregatesFilter<"DatabaseConnection"> | number | null
    totalUsers?: IntNullableWithAggregatesFilter<"DatabaseConnection"> | number | null
    category?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    description?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    founderAvatar?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    founderHandle?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    founderName?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    logo?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    tagline?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    website?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    readOnlyConnString?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
    readOnlyRoleName?: StringNullableWithAggregatesFilter<"DatabaseConnection"> | string | null
  }

  export type MetricSnapshotWhereInput = {
    AND?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    OR?: MetricSnapshotWhereInput[]
    NOT?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    id?: StringFilter<"MetricSnapshot"> | string
    connectionId?: StringFilter<"MetricSnapshot"> | string
    date?: DateTimeFilter<"MetricSnapshot"> | Date | string
    totalUsers?: IntFilter<"MetricSnapshot"> | number
    paidUsers?: IntFilter<"MetricSnapshot"> | number
    activeUsers?: IntFilter<"MetricSnapshot"> | number
    newSignups?: IntFilter<"MetricSnapshot"> | number
    churnedUsers?: IntFilter<"MetricSnapshot"> | number
    createdAt?: DateTimeFilter<"MetricSnapshot"> | Date | string
    DatabaseConnection?: XOR<DatabaseConnectionScalarRelationFilter, DatabaseConnectionWhereInput>
  }

  export type MetricSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    date?: SortOrder
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
    createdAt?: SortOrder
    DatabaseConnection?: DatabaseConnectionOrderByWithRelationInput
  }

  export type MetricSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    connectionId_date?: MetricSnapshotConnectionIdDateCompoundUniqueInput
    AND?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    OR?: MetricSnapshotWhereInput[]
    NOT?: MetricSnapshotWhereInput | MetricSnapshotWhereInput[]
    connectionId?: StringFilter<"MetricSnapshot"> | string
    date?: DateTimeFilter<"MetricSnapshot"> | Date | string
    totalUsers?: IntFilter<"MetricSnapshot"> | number
    paidUsers?: IntFilter<"MetricSnapshot"> | number
    activeUsers?: IntFilter<"MetricSnapshot"> | number
    newSignups?: IntFilter<"MetricSnapshot"> | number
    churnedUsers?: IntFilter<"MetricSnapshot"> | number
    createdAt?: DateTimeFilter<"MetricSnapshot"> | Date | string
    DatabaseConnection?: XOR<DatabaseConnectionScalarRelationFilter, DatabaseConnectionWhereInput>
  }, "id" | "connectionId_date">

  export type MetricSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    connectionId?: SortOrder
    date?: SortOrder
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
    createdAt?: SortOrder
    _count?: MetricSnapshotCountOrderByAggregateInput
    _avg?: MetricSnapshotAvgOrderByAggregateInput
    _max?: MetricSnapshotMaxOrderByAggregateInput
    _min?: MetricSnapshotMinOrderByAggregateInput
    _sum?: MetricSnapshotSumOrderByAggregateInput
  }

  export type MetricSnapshotScalarWhereWithAggregatesInput = {
    AND?: MetricSnapshotScalarWhereWithAggregatesInput | MetricSnapshotScalarWhereWithAggregatesInput[]
    OR?: MetricSnapshotScalarWhereWithAggregatesInput[]
    NOT?: MetricSnapshotScalarWhereWithAggregatesInput | MetricSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MetricSnapshot"> | string
    connectionId?: StringWithAggregatesFilter<"MetricSnapshot"> | string
    date?: DateTimeWithAggregatesFilter<"MetricSnapshot"> | Date | string
    totalUsers?: IntWithAggregatesFilter<"MetricSnapshot"> | number
    paidUsers?: IntWithAggregatesFilter<"MetricSnapshot"> | number
    activeUsers?: IntWithAggregatesFilter<"MetricSnapshot"> | number
    newSignups?: IntWithAggregatesFilter<"MetricSnapshot"> | number
    churnedUsers?: IntWithAggregatesFilter<"MetricSnapshot"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MetricSnapshot"> | Date | string
  }

  export type SpotlightWhereInput = {
    AND?: SpotlightWhereInput | SpotlightWhereInput[]
    OR?: SpotlightWhereInput[]
    NOT?: SpotlightWhereInput | SpotlightWhereInput[]
    id?: StringFilter<"Spotlight"> | string
    name?: StringFilter<"Spotlight"> | string
    tagline?: StringFilter<"Spotlight"> | string
    url?: StringFilter<"Spotlight"> | string
    logo?: StringNullableFilter<"Spotlight"> | string | null
    position?: IntNullableFilter<"Spotlight"> | number | null
    isActive?: BoolFilter<"Spotlight"> | boolean
    expiresAt?: DateTimeNullableFilter<"Spotlight"> | Date | string | null
    stripePaymentIntentId?: StringNullableFilter<"Spotlight"> | string | null
    stripeSessionId?: StringNullableFilter<"Spotlight"> | string | null
    paymentAmount?: IntNullableFilter<"Spotlight"> | number | null
    paidAt?: DateTimeNullableFilter<"Spotlight"> | Date | string | null
    createdAt?: DateTimeFilter<"Spotlight"> | Date | string
    updatedAt?: DateTimeFilter<"Spotlight"> | Date | string
  }

  export type SpotlightOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    url?: SortOrder
    logo?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotlightWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SpotlightWhereInput | SpotlightWhereInput[]
    OR?: SpotlightWhereInput[]
    NOT?: SpotlightWhereInput | SpotlightWhereInput[]
    name?: StringFilter<"Spotlight"> | string
    tagline?: StringFilter<"Spotlight"> | string
    url?: StringFilter<"Spotlight"> | string
    logo?: StringNullableFilter<"Spotlight"> | string | null
    position?: IntNullableFilter<"Spotlight"> | number | null
    isActive?: BoolFilter<"Spotlight"> | boolean
    expiresAt?: DateTimeNullableFilter<"Spotlight"> | Date | string | null
    stripePaymentIntentId?: StringNullableFilter<"Spotlight"> | string | null
    stripeSessionId?: StringNullableFilter<"Spotlight"> | string | null
    paymentAmount?: IntNullableFilter<"Spotlight"> | number | null
    paidAt?: DateTimeNullableFilter<"Spotlight"> | Date | string | null
    createdAt?: DateTimeFilter<"Spotlight"> | Date | string
    updatedAt?: DateTimeFilter<"Spotlight"> | Date | string
  }, "id">

  export type SpotlightOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    url?: SortOrder
    logo?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    stripePaymentIntentId?: SortOrderInput | SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SpotlightCountOrderByAggregateInput
    _avg?: SpotlightAvgOrderByAggregateInput
    _max?: SpotlightMaxOrderByAggregateInput
    _min?: SpotlightMinOrderByAggregateInput
    _sum?: SpotlightSumOrderByAggregateInput
  }

  export type SpotlightScalarWhereWithAggregatesInput = {
    AND?: SpotlightScalarWhereWithAggregatesInput | SpotlightScalarWhereWithAggregatesInput[]
    OR?: SpotlightScalarWhereWithAggregatesInput[]
    NOT?: SpotlightScalarWhereWithAggregatesInput | SpotlightScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Spotlight"> | string
    name?: StringWithAggregatesFilter<"Spotlight"> | string
    tagline?: StringWithAggregatesFilter<"Spotlight"> | string
    url?: StringWithAggregatesFilter<"Spotlight"> | string
    logo?: StringNullableWithAggregatesFilter<"Spotlight"> | string | null
    position?: IntNullableWithAggregatesFilter<"Spotlight"> | number | null
    isActive?: BoolWithAggregatesFilter<"Spotlight"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Spotlight"> | Date | string | null
    stripePaymentIntentId?: StringNullableWithAggregatesFilter<"Spotlight"> | string | null
    stripeSessionId?: StringNullableWithAggregatesFilter<"Spotlight"> | string | null
    paymentAmount?: IntNullableWithAggregatesFilter<"Spotlight"> | number | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Spotlight"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Spotlight"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Spotlight"> | Date | string
  }

  export type DbCredentialWhereInput = {
    AND?: DbCredentialWhereInput | DbCredentialWhereInput[]
    OR?: DbCredentialWhereInput[]
    NOT?: DbCredentialWhereInput | DbCredentialWhereInput[]
    id?: StringFilter<"DbCredential"> | string
    host?: StringFilter<"DbCredential"> | string
    port?: IntFilter<"DbCredential"> | number
    database?: StringFilter<"DbCredential"> | string
    username?: StringFilter<"DbCredential"> | string
    password?: StringFilter<"DbCredential"> | string
    ssl?: BoolFilter<"DbCredential"> | boolean
    createdAt?: DateTimeFilter<"DbCredential"> | Date | string
    updatedAt?: DateTimeFilter<"DbCredential"> | Date | string
    Startup?: StartupListRelationFilter
  }

  export type DbCredentialOrderByWithRelationInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    database?: SortOrder
    username?: SortOrder
    password?: SortOrder
    ssl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Startup?: StartupOrderByRelationAggregateInput
  }

  export type DbCredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DbCredentialWhereInput | DbCredentialWhereInput[]
    OR?: DbCredentialWhereInput[]
    NOT?: DbCredentialWhereInput | DbCredentialWhereInput[]
    host?: StringFilter<"DbCredential"> | string
    port?: IntFilter<"DbCredential"> | number
    database?: StringFilter<"DbCredential"> | string
    username?: StringFilter<"DbCredential"> | string
    password?: StringFilter<"DbCredential"> | string
    ssl?: BoolFilter<"DbCredential"> | boolean
    createdAt?: DateTimeFilter<"DbCredential"> | Date | string
    updatedAt?: DateTimeFilter<"DbCredential"> | Date | string
    Startup?: StartupListRelationFilter
  }, "id">

  export type DbCredentialOrderByWithAggregationInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    database?: SortOrder
    username?: SortOrder
    password?: SortOrder
    ssl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DbCredentialCountOrderByAggregateInput
    _avg?: DbCredentialAvgOrderByAggregateInput
    _max?: DbCredentialMaxOrderByAggregateInput
    _min?: DbCredentialMinOrderByAggregateInput
    _sum?: DbCredentialSumOrderByAggregateInput
  }

  export type DbCredentialScalarWhereWithAggregatesInput = {
    AND?: DbCredentialScalarWhereWithAggregatesInput | DbCredentialScalarWhereWithAggregatesInput[]
    OR?: DbCredentialScalarWhereWithAggregatesInput[]
    NOT?: DbCredentialScalarWhereWithAggregatesInput | DbCredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DbCredential"> | string
    host?: StringWithAggregatesFilter<"DbCredential"> | string
    port?: IntWithAggregatesFilter<"DbCredential"> | number
    database?: StringWithAggregatesFilter<"DbCredential"> | string
    username?: StringWithAggregatesFilter<"DbCredential"> | string
    password?: StringWithAggregatesFilter<"DbCredential"> | string
    ssl?: BoolWithAggregatesFilter<"DbCredential"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DbCredential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DbCredential"> | Date | string
  }

  export type StartupWhereInput = {
    AND?: StartupWhereInput | StartupWhereInput[]
    OR?: StartupWhereInput[]
    NOT?: StartupWhereInput | StartupWhereInput[]
    id?: StringFilter<"Startup"> | string
    name?: StringFilter<"Startup"> | string
    slug?: StringFilter<"Startup"> | string
    description?: StringNullableFilter<"Startup"> | string | null
    logoUrl?: StringNullableFilter<"Startup"> | string | null
    provider?: StringFilter<"Startup"> | string
    credentialsId?: StringFilter<"Startup"> | string
    createdAt?: DateTimeFilter<"Startup"> | Date | string
    updatedAt?: DateTimeFilter<"Startup"> | Date | string
    DbCredential?: XOR<DbCredentialScalarRelationFilter, DbCredentialWhereInput>
  }

  export type StartupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    provider?: SortOrder
    credentialsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    DbCredential?: DbCredentialOrderByWithRelationInput
  }

  export type StartupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: StartupWhereInput | StartupWhereInput[]
    OR?: StartupWhereInput[]
    NOT?: StartupWhereInput | StartupWhereInput[]
    name?: StringFilter<"Startup"> | string
    description?: StringNullableFilter<"Startup"> | string | null
    logoUrl?: StringNullableFilter<"Startup"> | string | null
    provider?: StringFilter<"Startup"> | string
    credentialsId?: StringFilter<"Startup"> | string
    createdAt?: DateTimeFilter<"Startup"> | Date | string
    updatedAt?: DateTimeFilter<"Startup"> | Date | string
    DbCredential?: XOR<DbCredentialScalarRelationFilter, DbCredentialWhereInput>
  }, "id" | "slug">

  export type StartupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    provider?: SortOrder
    credentialsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StartupCountOrderByAggregateInput
    _max?: StartupMaxOrderByAggregateInput
    _min?: StartupMinOrderByAggregateInput
  }

  export type StartupScalarWhereWithAggregatesInput = {
    AND?: StartupScalarWhereWithAggregatesInput | StartupScalarWhereWithAggregatesInput[]
    OR?: StartupScalarWhereWithAggregatesInput[]
    NOT?: StartupScalarWhereWithAggregatesInput | StartupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Startup"> | string
    name?: StringWithAggregatesFilter<"Startup"> | string
    slug?: StringWithAggregatesFilter<"Startup"> | string
    description?: StringNullableWithAggregatesFilter<"Startup"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Startup"> | string | null
    provider?: StringWithAggregatesFilter<"Startup"> | string
    credentialsId?: StringWithAggregatesFilter<"Startup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Startup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Startup"> | Date | string
  }

  export type DatabaseConnectionCreateInput = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables?: DatabaseConnectionCreateselectedTablesInput | string[]
    createdAt?: Date | string
    updatedAt: Date | string
    startupName: string
    slug?: string | null
    paidUsers?: number | null
    totalUsers?: number | null
    category?: string | null
    description?: string | null
    founderAvatar?: string | null
    founderHandle?: string | null
    founderName?: string | null
    logo?: string | null
    tagline?: string | null
    website?: string | null
    readOnlyConnString?: string | null
    readOnlyRoleName?: string | null
    MetricSnapshot?: MetricSnapshotCreateNestedManyWithoutDatabaseConnectionInput
  }

  export type DatabaseConnectionUncheckedCreateInput = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables?: DatabaseConnectionCreateselectedTablesInput | string[]
    createdAt?: Date | string
    updatedAt: Date | string
    startupName: string
    slug?: string | null
    paidUsers?: number | null
    totalUsers?: number | null
    category?: string | null
    description?: string | null
    founderAvatar?: string | null
    founderHandle?: string | null
    founderName?: string | null
    logo?: string | null
    tagline?: string | null
    website?: string | null
    readOnlyConnString?: string | null
    readOnlyRoleName?: string | null
    MetricSnapshot?: MetricSnapshotUncheckedCreateNestedManyWithoutDatabaseConnectionInput
  }

  export type DatabaseConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
    MetricSnapshot?: MetricSnapshotUpdateManyWithoutDatabaseConnectionNestedInput
  }

  export type DatabaseConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
    MetricSnapshot?: MetricSnapshotUncheckedUpdateManyWithoutDatabaseConnectionNestedInput
  }

  export type DatabaseConnectionCreateManyInput = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables?: DatabaseConnectionCreateselectedTablesInput | string[]
    createdAt?: Date | string
    updatedAt: Date | string
    startupName: string
    slug?: string | null
    paidUsers?: number | null
    totalUsers?: number | null
    category?: string | null
    description?: string | null
    founderAvatar?: string | null
    founderHandle?: string | null
    founderName?: string | null
    logo?: string | null
    tagline?: string | null
    website?: string | null
    readOnlyConnString?: string | null
    readOnlyRoleName?: string | null
  }

  export type DatabaseConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DatabaseConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MetricSnapshotCreateInput = {
    id: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
    DatabaseConnection: DatabaseConnectionCreateNestedOneWithoutMetricSnapshotInput
  }

  export type MetricSnapshotUncheckedCreateInput = {
    id: string
    connectionId: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
  }

  export type MetricSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DatabaseConnection?: DatabaseConnectionUpdateOneRequiredWithoutMetricSnapshotNestedInput
  }

  export type MetricSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotCreateManyInput = {
    id: string
    connectionId: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
  }

  export type MetricSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    connectionId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotlightCreateInput = {
    id?: string
    name: string
    tagline: string
    url: string
    logo?: string | null
    position?: number | null
    isActive?: boolean
    expiresAt?: Date | string | null
    stripePaymentIntentId?: string | null
    stripeSessionId?: string | null
    paymentAmount?: number | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotlightUncheckedCreateInput = {
    id?: string
    name: string
    tagline: string
    url: string
    logo?: string | null
    position?: number | null
    isActive?: boolean
    expiresAt?: Date | string | null
    stripePaymentIntentId?: string | null
    stripeSessionId?: string | null
    paymentAmount?: number | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotlightUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotlightUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotlightCreateManyInput = {
    id?: string
    name: string
    tagline: string
    url: string
    logo?: string | null
    position?: number | null
    isActive?: boolean
    expiresAt?: Date | string | null
    stripePaymentIntentId?: string | null
    stripeSessionId?: string | null
    paymentAmount?: number | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SpotlightUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SpotlightUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    stripePaymentIntentId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentAmount?: NullableIntFieldUpdateOperationsInput | number | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbCredentialCreateInput = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Startup?: StartupCreateNestedManyWithoutDbCredentialInput
  }

  export type DbCredentialUncheckedCreateInput = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
    Startup?: StartupUncheckedCreateNestedManyWithoutDbCredentialInput
  }

  export type DbCredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Startup?: StartupUpdateManyWithoutDbCredentialNestedInput
  }

  export type DbCredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Startup?: StartupUncheckedUpdateManyWithoutDbCredentialNestedInput
  }

  export type DbCredentialCreateManyInput = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type DbCredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbCredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupCreateInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    createdAt?: Date | string
    updatedAt: Date | string
    DbCredential: DbCredentialCreateNestedOneWithoutStartupInput
  }

  export type StartupUncheckedCreateInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    credentialsId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type StartupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DbCredential?: DbCredentialUpdateOneRequiredWithoutStartupNestedInput
  }

  export type StartupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    credentialsId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupCreateManyInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    credentialsId: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type StartupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    credentialsId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MetricSnapshotListRelationFilter = {
    every?: MetricSnapshotWhereInput
    some?: MetricSnapshotWhereInput
    none?: MetricSnapshotWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MetricSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DatabaseConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    connectionString?: SortOrder
    selectedTables?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startupName?: SortOrder
    slug?: SortOrder
    paidUsers?: SortOrder
    totalUsers?: SortOrder
    category?: SortOrder
    description?: SortOrder
    founderAvatar?: SortOrder
    founderHandle?: SortOrder
    founderName?: SortOrder
    logo?: SortOrder
    tagline?: SortOrder
    website?: SortOrder
    readOnlyConnString?: SortOrder
    readOnlyRoleName?: SortOrder
  }

  export type DatabaseConnectionAvgOrderByAggregateInput = {
    paidUsers?: SortOrder
    totalUsers?: SortOrder
  }

  export type DatabaseConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    connectionString?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startupName?: SortOrder
    slug?: SortOrder
    paidUsers?: SortOrder
    totalUsers?: SortOrder
    category?: SortOrder
    description?: SortOrder
    founderAvatar?: SortOrder
    founderHandle?: SortOrder
    founderName?: SortOrder
    logo?: SortOrder
    tagline?: SortOrder
    website?: SortOrder
    readOnlyConnString?: SortOrder
    readOnlyRoleName?: SortOrder
  }

  export type DatabaseConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    connectionString?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    startupName?: SortOrder
    slug?: SortOrder
    paidUsers?: SortOrder
    totalUsers?: SortOrder
    category?: SortOrder
    description?: SortOrder
    founderAvatar?: SortOrder
    founderHandle?: SortOrder
    founderName?: SortOrder
    logo?: SortOrder
    tagline?: SortOrder
    website?: SortOrder
    readOnlyConnString?: SortOrder
    readOnlyRoleName?: SortOrder
  }

  export type DatabaseConnectionSumOrderByAggregateInput = {
    paidUsers?: SortOrder
    totalUsers?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DatabaseConnectionScalarRelationFilter = {
    is?: DatabaseConnectionWhereInput
    isNot?: DatabaseConnectionWhereInput
  }

  export type MetricSnapshotConnectionIdDateCompoundUniqueInput = {
    connectionId: string
    date: Date | string
  }

  export type MetricSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    date?: SortOrder
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type MetricSnapshotAvgOrderByAggregateInput = {
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
  }

  export type MetricSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    date?: SortOrder
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type MetricSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    connectionId?: SortOrder
    date?: SortOrder
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
    createdAt?: SortOrder
  }

  export type MetricSnapshotSumOrderByAggregateInput = {
    totalUsers?: SortOrder
    paidUsers?: SortOrder
    activeUsers?: SortOrder
    newSignups?: SortOrder
    churnedUsers?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SpotlightCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    position?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeSessionId?: SortOrder
    paymentAmount?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotlightAvgOrderByAggregateInput = {
    position?: SortOrder
    paymentAmount?: SortOrder
  }

  export type SpotlightMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    position?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeSessionId?: SortOrder
    paymentAmount?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotlightMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    position?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    stripePaymentIntentId?: SortOrder
    stripeSessionId?: SortOrder
    paymentAmount?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SpotlightSumOrderByAggregateInput = {
    position?: SortOrder
    paymentAmount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StartupListRelationFilter = {
    every?: StartupWhereInput
    some?: StartupWhereInput
    none?: StartupWhereInput
  }

  export type StartupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DbCredentialCountOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    database?: SortOrder
    username?: SortOrder
    password?: SortOrder
    ssl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbCredentialAvgOrderByAggregateInput = {
    port?: SortOrder
  }

  export type DbCredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    database?: SortOrder
    username?: SortOrder
    password?: SortOrder
    ssl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbCredentialMinOrderByAggregateInput = {
    id?: SortOrder
    host?: SortOrder
    port?: SortOrder
    database?: SortOrder
    username?: SortOrder
    password?: SortOrder
    ssl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DbCredentialSumOrderByAggregateInput = {
    port?: SortOrder
  }

  export type DbCredentialScalarRelationFilter = {
    is?: DbCredentialWhereInput
    isNot?: DbCredentialWhereInput
  }

  export type StartupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    provider?: SortOrder
    credentialsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StartupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    provider?: SortOrder
    credentialsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StartupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    provider?: SortOrder
    credentialsId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DatabaseConnectionCreateselectedTablesInput = {
    set: string[]
  }

  export type MetricSnapshotCreateNestedManyWithoutDatabaseConnectionInput = {
    create?: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput> | MetricSnapshotCreateWithoutDatabaseConnectionInput[] | MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput[]
    connectOrCreate?: MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput | MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput[]
    createMany?: MetricSnapshotCreateManyDatabaseConnectionInputEnvelope
    connect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
  }

  export type MetricSnapshotUncheckedCreateNestedManyWithoutDatabaseConnectionInput = {
    create?: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput> | MetricSnapshotCreateWithoutDatabaseConnectionInput[] | MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput[]
    connectOrCreate?: MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput | MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput[]
    createMany?: MetricSnapshotCreateManyDatabaseConnectionInputEnvelope
    connect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DatabaseConnectionUpdateselectedTablesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MetricSnapshotUpdateManyWithoutDatabaseConnectionNestedInput = {
    create?: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput> | MetricSnapshotCreateWithoutDatabaseConnectionInput[] | MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput[]
    connectOrCreate?: MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput | MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput[]
    upsert?: MetricSnapshotUpsertWithWhereUniqueWithoutDatabaseConnectionInput | MetricSnapshotUpsertWithWhereUniqueWithoutDatabaseConnectionInput[]
    createMany?: MetricSnapshotCreateManyDatabaseConnectionInputEnvelope
    set?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    disconnect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    delete?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    connect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    update?: MetricSnapshotUpdateWithWhereUniqueWithoutDatabaseConnectionInput | MetricSnapshotUpdateWithWhereUniqueWithoutDatabaseConnectionInput[]
    updateMany?: MetricSnapshotUpdateManyWithWhereWithoutDatabaseConnectionInput | MetricSnapshotUpdateManyWithWhereWithoutDatabaseConnectionInput[]
    deleteMany?: MetricSnapshotScalarWhereInput | MetricSnapshotScalarWhereInput[]
  }

  export type MetricSnapshotUncheckedUpdateManyWithoutDatabaseConnectionNestedInput = {
    create?: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput> | MetricSnapshotCreateWithoutDatabaseConnectionInput[] | MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput[]
    connectOrCreate?: MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput | MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput[]
    upsert?: MetricSnapshotUpsertWithWhereUniqueWithoutDatabaseConnectionInput | MetricSnapshotUpsertWithWhereUniqueWithoutDatabaseConnectionInput[]
    createMany?: MetricSnapshotCreateManyDatabaseConnectionInputEnvelope
    set?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    disconnect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    delete?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    connect?: MetricSnapshotWhereUniqueInput | MetricSnapshotWhereUniqueInput[]
    update?: MetricSnapshotUpdateWithWhereUniqueWithoutDatabaseConnectionInput | MetricSnapshotUpdateWithWhereUniqueWithoutDatabaseConnectionInput[]
    updateMany?: MetricSnapshotUpdateManyWithWhereWithoutDatabaseConnectionInput | MetricSnapshotUpdateManyWithWhereWithoutDatabaseConnectionInput[]
    deleteMany?: MetricSnapshotScalarWhereInput | MetricSnapshotScalarWhereInput[]
  }

  export type DatabaseConnectionCreateNestedOneWithoutMetricSnapshotInput = {
    create?: XOR<DatabaseConnectionCreateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedCreateWithoutMetricSnapshotInput>
    connectOrCreate?: DatabaseConnectionCreateOrConnectWithoutMetricSnapshotInput
    connect?: DatabaseConnectionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DatabaseConnectionUpdateOneRequiredWithoutMetricSnapshotNestedInput = {
    create?: XOR<DatabaseConnectionCreateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedCreateWithoutMetricSnapshotInput>
    connectOrCreate?: DatabaseConnectionCreateOrConnectWithoutMetricSnapshotInput
    upsert?: DatabaseConnectionUpsertWithoutMetricSnapshotInput
    connect?: DatabaseConnectionWhereUniqueInput
    update?: XOR<XOR<DatabaseConnectionUpdateToOneWithWhereWithoutMetricSnapshotInput, DatabaseConnectionUpdateWithoutMetricSnapshotInput>, DatabaseConnectionUncheckedUpdateWithoutMetricSnapshotInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StartupCreateNestedManyWithoutDbCredentialInput = {
    create?: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput> | StartupCreateWithoutDbCredentialInput[] | StartupUncheckedCreateWithoutDbCredentialInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutDbCredentialInput | StartupCreateOrConnectWithoutDbCredentialInput[]
    createMany?: StartupCreateManyDbCredentialInputEnvelope
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
  }

  export type StartupUncheckedCreateNestedManyWithoutDbCredentialInput = {
    create?: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput> | StartupCreateWithoutDbCredentialInput[] | StartupUncheckedCreateWithoutDbCredentialInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutDbCredentialInput | StartupCreateOrConnectWithoutDbCredentialInput[]
    createMany?: StartupCreateManyDbCredentialInputEnvelope
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
  }

  export type StartupUpdateManyWithoutDbCredentialNestedInput = {
    create?: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput> | StartupCreateWithoutDbCredentialInput[] | StartupUncheckedCreateWithoutDbCredentialInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutDbCredentialInput | StartupCreateOrConnectWithoutDbCredentialInput[]
    upsert?: StartupUpsertWithWhereUniqueWithoutDbCredentialInput | StartupUpsertWithWhereUniqueWithoutDbCredentialInput[]
    createMany?: StartupCreateManyDbCredentialInputEnvelope
    set?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    disconnect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    delete?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    update?: StartupUpdateWithWhereUniqueWithoutDbCredentialInput | StartupUpdateWithWhereUniqueWithoutDbCredentialInput[]
    updateMany?: StartupUpdateManyWithWhereWithoutDbCredentialInput | StartupUpdateManyWithWhereWithoutDbCredentialInput[]
    deleteMany?: StartupScalarWhereInput | StartupScalarWhereInput[]
  }

  export type StartupUncheckedUpdateManyWithoutDbCredentialNestedInput = {
    create?: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput> | StartupCreateWithoutDbCredentialInput[] | StartupUncheckedCreateWithoutDbCredentialInput[]
    connectOrCreate?: StartupCreateOrConnectWithoutDbCredentialInput | StartupCreateOrConnectWithoutDbCredentialInput[]
    upsert?: StartupUpsertWithWhereUniqueWithoutDbCredentialInput | StartupUpsertWithWhereUniqueWithoutDbCredentialInput[]
    createMany?: StartupCreateManyDbCredentialInputEnvelope
    set?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    disconnect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    delete?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    connect?: StartupWhereUniqueInput | StartupWhereUniqueInput[]
    update?: StartupUpdateWithWhereUniqueWithoutDbCredentialInput | StartupUpdateWithWhereUniqueWithoutDbCredentialInput[]
    updateMany?: StartupUpdateManyWithWhereWithoutDbCredentialInput | StartupUpdateManyWithWhereWithoutDbCredentialInput[]
    deleteMany?: StartupScalarWhereInput | StartupScalarWhereInput[]
  }

  export type DbCredentialCreateNestedOneWithoutStartupInput = {
    create?: XOR<DbCredentialCreateWithoutStartupInput, DbCredentialUncheckedCreateWithoutStartupInput>
    connectOrCreate?: DbCredentialCreateOrConnectWithoutStartupInput
    connect?: DbCredentialWhereUniqueInput
  }

  export type DbCredentialUpdateOneRequiredWithoutStartupNestedInput = {
    create?: XOR<DbCredentialCreateWithoutStartupInput, DbCredentialUncheckedCreateWithoutStartupInput>
    connectOrCreate?: DbCredentialCreateOrConnectWithoutStartupInput
    upsert?: DbCredentialUpsertWithoutStartupInput
    connect?: DbCredentialWhereUniqueInput
    update?: XOR<XOR<DbCredentialUpdateToOneWithWhereWithoutStartupInput, DbCredentialUpdateWithoutStartupInput>, DbCredentialUncheckedUpdateWithoutStartupInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type MetricSnapshotCreateWithoutDatabaseConnectionInput = {
    id: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
  }

  export type MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput = {
    id: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
  }

  export type MetricSnapshotCreateOrConnectWithoutDatabaseConnectionInput = {
    where: MetricSnapshotWhereUniqueInput
    create: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput>
  }

  export type MetricSnapshotCreateManyDatabaseConnectionInputEnvelope = {
    data: MetricSnapshotCreateManyDatabaseConnectionInput | MetricSnapshotCreateManyDatabaseConnectionInput[]
    skipDuplicates?: boolean
  }

  export type MetricSnapshotUpsertWithWhereUniqueWithoutDatabaseConnectionInput = {
    where: MetricSnapshotWhereUniqueInput
    update: XOR<MetricSnapshotUpdateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedUpdateWithoutDatabaseConnectionInput>
    create: XOR<MetricSnapshotCreateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedCreateWithoutDatabaseConnectionInput>
  }

  export type MetricSnapshotUpdateWithWhereUniqueWithoutDatabaseConnectionInput = {
    where: MetricSnapshotWhereUniqueInput
    data: XOR<MetricSnapshotUpdateWithoutDatabaseConnectionInput, MetricSnapshotUncheckedUpdateWithoutDatabaseConnectionInput>
  }

  export type MetricSnapshotUpdateManyWithWhereWithoutDatabaseConnectionInput = {
    where: MetricSnapshotScalarWhereInput
    data: XOR<MetricSnapshotUpdateManyMutationInput, MetricSnapshotUncheckedUpdateManyWithoutDatabaseConnectionInput>
  }

  export type MetricSnapshotScalarWhereInput = {
    AND?: MetricSnapshotScalarWhereInput | MetricSnapshotScalarWhereInput[]
    OR?: MetricSnapshotScalarWhereInput[]
    NOT?: MetricSnapshotScalarWhereInput | MetricSnapshotScalarWhereInput[]
    id?: StringFilter<"MetricSnapshot"> | string
    connectionId?: StringFilter<"MetricSnapshot"> | string
    date?: DateTimeFilter<"MetricSnapshot"> | Date | string
    totalUsers?: IntFilter<"MetricSnapshot"> | number
    paidUsers?: IntFilter<"MetricSnapshot"> | number
    activeUsers?: IntFilter<"MetricSnapshot"> | number
    newSignups?: IntFilter<"MetricSnapshot"> | number
    churnedUsers?: IntFilter<"MetricSnapshot"> | number
    createdAt?: DateTimeFilter<"MetricSnapshot"> | Date | string
  }

  export type DatabaseConnectionCreateWithoutMetricSnapshotInput = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables?: DatabaseConnectionCreateselectedTablesInput | string[]
    createdAt?: Date | string
    updatedAt: Date | string
    startupName: string
    slug?: string | null
    paidUsers?: number | null
    totalUsers?: number | null
    category?: string | null
    description?: string | null
    founderAvatar?: string | null
    founderHandle?: string | null
    founderName?: string | null
    logo?: string | null
    tagline?: string | null
    website?: string | null
    readOnlyConnString?: string | null
    readOnlyRoleName?: string | null
  }

  export type DatabaseConnectionUncheckedCreateWithoutMetricSnapshotInput = {
    id: string
    name: string
    provider: string
    connectionString: string
    selectedTables?: DatabaseConnectionCreateselectedTablesInput | string[]
    createdAt?: Date | string
    updatedAt: Date | string
    startupName: string
    slug?: string | null
    paidUsers?: number | null
    totalUsers?: number | null
    category?: string | null
    description?: string | null
    founderAvatar?: string | null
    founderHandle?: string | null
    founderName?: string | null
    logo?: string | null
    tagline?: string | null
    website?: string | null
    readOnlyConnString?: string | null
    readOnlyRoleName?: string | null
  }

  export type DatabaseConnectionCreateOrConnectWithoutMetricSnapshotInput = {
    where: DatabaseConnectionWhereUniqueInput
    create: XOR<DatabaseConnectionCreateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedCreateWithoutMetricSnapshotInput>
  }

  export type DatabaseConnectionUpsertWithoutMetricSnapshotInput = {
    update: XOR<DatabaseConnectionUpdateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedUpdateWithoutMetricSnapshotInput>
    create: XOR<DatabaseConnectionCreateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedCreateWithoutMetricSnapshotInput>
    where?: DatabaseConnectionWhereInput
  }

  export type DatabaseConnectionUpdateToOneWithWhereWithoutMetricSnapshotInput = {
    where?: DatabaseConnectionWhereInput
    data: XOR<DatabaseConnectionUpdateWithoutMetricSnapshotInput, DatabaseConnectionUncheckedUpdateWithoutMetricSnapshotInput>
  }

  export type DatabaseConnectionUpdateWithoutMetricSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DatabaseConnectionUncheckedUpdateWithoutMetricSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    connectionString?: StringFieldUpdateOperationsInput | string
    selectedTables?: DatabaseConnectionUpdateselectedTablesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    startupName?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    paidUsers?: NullableIntFieldUpdateOperationsInput | number | null
    totalUsers?: NullableIntFieldUpdateOperationsInput | number | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    founderAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    founderHandle?: NullableStringFieldUpdateOperationsInput | string | null
    founderName?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyConnString?: NullableStringFieldUpdateOperationsInput | string | null
    readOnlyRoleName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StartupCreateWithoutDbCredentialInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type StartupUncheckedCreateWithoutDbCredentialInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type StartupCreateOrConnectWithoutDbCredentialInput = {
    where: StartupWhereUniqueInput
    create: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput>
  }

  export type StartupCreateManyDbCredentialInputEnvelope = {
    data: StartupCreateManyDbCredentialInput | StartupCreateManyDbCredentialInput[]
    skipDuplicates?: boolean
  }

  export type StartupUpsertWithWhereUniqueWithoutDbCredentialInput = {
    where: StartupWhereUniqueInput
    update: XOR<StartupUpdateWithoutDbCredentialInput, StartupUncheckedUpdateWithoutDbCredentialInput>
    create: XOR<StartupCreateWithoutDbCredentialInput, StartupUncheckedCreateWithoutDbCredentialInput>
  }

  export type StartupUpdateWithWhereUniqueWithoutDbCredentialInput = {
    where: StartupWhereUniqueInput
    data: XOR<StartupUpdateWithoutDbCredentialInput, StartupUncheckedUpdateWithoutDbCredentialInput>
  }

  export type StartupUpdateManyWithWhereWithoutDbCredentialInput = {
    where: StartupScalarWhereInput
    data: XOR<StartupUpdateManyMutationInput, StartupUncheckedUpdateManyWithoutDbCredentialInput>
  }

  export type StartupScalarWhereInput = {
    AND?: StartupScalarWhereInput | StartupScalarWhereInput[]
    OR?: StartupScalarWhereInput[]
    NOT?: StartupScalarWhereInput | StartupScalarWhereInput[]
    id?: StringFilter<"Startup"> | string
    name?: StringFilter<"Startup"> | string
    slug?: StringFilter<"Startup"> | string
    description?: StringNullableFilter<"Startup"> | string | null
    logoUrl?: StringNullableFilter<"Startup"> | string | null
    provider?: StringFilter<"Startup"> | string
    credentialsId?: StringFilter<"Startup"> | string
    createdAt?: DateTimeFilter<"Startup"> | Date | string
    updatedAt?: DateTimeFilter<"Startup"> | Date | string
  }

  export type DbCredentialCreateWithoutStartupInput = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type DbCredentialUncheckedCreateWithoutStartupInput = {
    id: string
    host: string
    port: number
    database: string
    username: string
    password: string
    ssl?: boolean
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type DbCredentialCreateOrConnectWithoutStartupInput = {
    where: DbCredentialWhereUniqueInput
    create: XOR<DbCredentialCreateWithoutStartupInput, DbCredentialUncheckedCreateWithoutStartupInput>
  }

  export type DbCredentialUpsertWithoutStartupInput = {
    update: XOR<DbCredentialUpdateWithoutStartupInput, DbCredentialUncheckedUpdateWithoutStartupInput>
    create: XOR<DbCredentialCreateWithoutStartupInput, DbCredentialUncheckedCreateWithoutStartupInput>
    where?: DbCredentialWhereInput
  }

  export type DbCredentialUpdateToOneWithWhereWithoutStartupInput = {
    where?: DbCredentialWhereInput
    data: XOR<DbCredentialUpdateWithoutStartupInput, DbCredentialUncheckedUpdateWithoutStartupInput>
  }

  export type DbCredentialUpdateWithoutStartupInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DbCredentialUncheckedUpdateWithoutStartupInput = {
    id?: StringFieldUpdateOperationsInput | string
    host?: StringFieldUpdateOperationsInput | string
    port?: IntFieldUpdateOperationsInput | number
    database?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    ssl?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotCreateManyDatabaseConnectionInput = {
    id: string
    date: Date | string
    totalUsers?: number
    paidUsers?: number
    activeUsers?: number
    newSignups?: number
    churnedUsers?: number
    createdAt?: Date | string
  }

  export type MetricSnapshotUpdateWithoutDatabaseConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotUncheckedUpdateWithoutDatabaseConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MetricSnapshotUncheckedUpdateManyWithoutDatabaseConnectionInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    totalUsers?: IntFieldUpdateOperationsInput | number
    paidUsers?: IntFieldUpdateOperationsInput | number
    activeUsers?: IntFieldUpdateOperationsInput | number
    newSignups?: IntFieldUpdateOperationsInput | number
    churnedUsers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupCreateManyDbCredentialInput = {
    id: string
    name: string
    slug: string
    description?: string | null
    logoUrl?: string | null
    provider: string
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type StartupUpdateWithoutDbCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupUncheckedUpdateWithoutDbCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StartupUncheckedUpdateManyWithoutDbCredentialInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
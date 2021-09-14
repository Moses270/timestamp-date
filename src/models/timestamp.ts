export class Timestamp {
  public seconds: number;
  public nanoseconds: number;

  constructor(seconds: number, nanoseconds: number) {
    this.seconds = seconds;
    this.nanoseconds = nanoseconds;
  }

  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @return a new timestamp representing the current date.
   */
  static now(): Timestamp {
    const date = Date.now();

    return new Timestamp(parseInt((date / 1000).toString()), date * 1000);
  };

  /**
   * Creates a new timestamp from the given date.
   *
   * @param date The date to initialize the `Timestamp` from.
   * @return A new `Timestamp` representing the same point in time as the given
   *     date.
   */
  static fromDate(date: Date): Timestamp {
    const t = date.getTime();

    return new Timestamp(parseInt((t / 1000).toString()), t * 1000);
  };

  /**
   * Creates a new timestamp from the given number of milliseconds.
   *
   * @param milliseconds Number of milliseconds since Unix epoch
   *     1970-01-01T00:00:00Z.
   * @return A new `Timestamp` representing the same point in time as the given
   *     number of milliseconds.
   */
  static fromMillis(milliseconds: number): Timestamp {
    return new Timestamp(parseInt((milliseconds / 1000).toString()), milliseconds * 1000);
  };

  /**
   * Convert a Timestamp to a JavaScript `Date` object. This conversion causes
   * a loss of precision since `Date` objects only support millisecond precision.
   *
   * @return JavaScript `Date` object representing the same point in time as
   *     this `Timestamp`, with millisecond precision.
   */
  public toDate(): Date {
    return new Date(this.toMillis());
  }

  /**
   * Convert a timestamp to a numeric timestamp (in milliseconds since epoch).
   * This operation causes a loss of precision.
   *
   * @return The point in time corresponding to this timestamp, represented as
   *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */
  public toMillis(): number {
    return this.seconds * 1000;
  }

  /**
   * Returns true if this `Timestamp` is equal to the provided one.
   *
   * @param other The `Timestamp` to compare against.
   * @return true if this `Timestamp` is equal to the provided one.
   */
  public isEqual(other: Timestamp): boolean {
    return this.seconds === other.seconds;
  }

  /**
   * Converts this object to a primitive string, which allows Timestamp objects to be compared
   * using the `>`, `<=`, `>=` and `>` operators.
   */
  public valueOf(): string {
    return JSON.stringify(this);
  }
}
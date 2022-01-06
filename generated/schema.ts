// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("signerId", Value.fromString(""));
    this.set("withdrawCrop", Value.fromStringArray(new Array(0)));
    this.set("transfers", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Account entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get signerId(): string {
    let value = this.get("signerId");
    return value!.toString();
  }

  set signerId(value: string) {
    this.set("signerId", Value.fromString(value));
  }

  get withdrawCrop(): Array<string> {
    let value = this.get("withdrawCrop");
    return value!.toStringArray();
  }

  set withdrawCrop(value: Array<string>) {
    this.set("withdrawCrop", Value.fromStringArray(value));
  }

  get transfers(): Array<string> {
    let value = this.get("transfers");
    return value!.toStringArray();
  }

  set transfers(value: Array<string>) {
    this.set("transfers", Value.fromStringArray(value));
  }
}

export class WithdrawCrop extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save WithdrawCrop entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save WithdrawCrop entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("WithdrawCrop", id.toString(), this);
    }
  }

  static load(id: string): WithdrawCrop | null {
    return changetype<WithdrawCrop | null>(store.get("WithdrawCrop", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get output(): string | null {
    let value = this.get("output");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set output(value: string | null) {
    if (!value) {
      this.unset("output");
    } else {
      this.set("output", Value.fromString(<string>value));
    }
  }

  get action(): string | null {
    let value = this.get("action");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set action(value: string | null) {
    if (!value) {
      this.unset("action");
    } else {
      this.set("action", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockTime(): BigInt | null {
    let value = this.get("blockTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTime(value: BigInt | null) {
    if (!value) {
      this.unset("blockTime");
    } else {
      this.set("blockTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockHeight(): BigInt | null {
    let value = this.get("blockHeight");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockHeight(value: BigInt | null) {
    if (!value) {
      this.unset("blockHeight");
    } else {
      this.set("blockHeight", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockHash(): string | null {
    let value = this.get("blockHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set blockHash(value: string | null) {
    if (!value) {
      this.unset("blockHash");
    } else {
      this.set("blockHash", Value.fromString(<string>value));
    }
  }

  get token(): string | null {
    let value = this.get("token");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set token(value: string | null) {
    if (!value) {
      this.unset("token");
    } else {
      this.set("token", Value.fromString(<string>value));
    }
  }

  get receiverId(): string | null {
    let value = this.get("receiverId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set receiverId(value: string | null) {
    if (!value) {
      this.unset("receiverId");
    } else {
      this.set("receiverId", Value.fromString(<string>value));
    }
  }

  get memo(): string | null {
    let value = this.get("memo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set memo(value: string | null) {
    if (!value) {
      this.unset("memo");
    } else {
      this.set("memo", Value.fromString(<string>value));
    }
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Transfer entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Transfer entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Transfer", id.toString(), this);
    }
  }

  static load(id: string): Transfer | null {
    return changetype<Transfer | null>(store.get("Transfer", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get output(): string | null {
    let value = this.get("output");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set output(value: string | null) {
    if (!value) {
      this.unset("output");
    } else {
      this.set("output", Value.fromString(<string>value));
    }
  }

  get action(): string | null {
    let value = this.get("action");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set action(value: string | null) {
    if (!value) {
      this.unset("action");
    } else {
      this.set("action", Value.fromString(<string>value));
    }
  }

  get amount(): BigInt | null {
    let value = this.get("amount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set amount(value: BigInt | null) {
    if (!value) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(<BigInt>value));
    }
  }

  get transferFrom(): string | null {
    let value = this.get("transferFrom");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transferFrom(value: string | null) {
    if (!value) {
      this.unset("transferFrom");
    } else {
      this.set("transferFrom", Value.fromString(<string>value));
    }
  }

  get transferTo(): string | null {
    let value = this.get("transferTo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set transferTo(value: string | null) {
    if (!value) {
      this.unset("transferTo");
    } else {
      this.set("transferTo", Value.fromString(<string>value));
    }
  }

  get memo(): string | null {
    let value = this.get("memo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set memo(value: string | null) {
    if (!value) {
      this.unset("memo");
    } else {
      this.set("memo", Value.fromString(<string>value));
    }
  }

  get blockTime(): BigInt | null {
    let value = this.get("blockTime");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTime(value: BigInt | null) {
    if (!value) {
      this.unset("blockTime");
    } else {
      this.set("blockTime", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockHeight(): BigInt | null {
    let value = this.get("blockHeight");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockHeight(value: BigInt | null) {
    if (!value) {
      this.unset("blockHeight");
    } else {
      this.set("blockHeight", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockHash(): string | null {
    let value = this.get("blockHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set blockHash(value: string | null) {
    if (!value) {
      this.unset("blockHash");
    } else {
      this.set("blockHash", Value.fromString(<string>value));
    }
  }
}

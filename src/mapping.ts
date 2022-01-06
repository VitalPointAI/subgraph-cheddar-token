import { near, log, BigInt, json, JSONValueKind } from "@graphprotocol/graph-ts";
import { Account, WithdrawCrop, TokenCallback, ClosedAccount, Unstake } from "../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i], 
      receipt.receipt, 
      receipt.block.header,
      receipt.outcome
      );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {
  
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }
  
  let accounts = new Account(receipt.signerId);
  const functionCall = action.toFunctionCall();

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "mint_callback") {
    const receiptId = receipt.id.toHexString();
      accounts.signerId = receipt.signerId;

      // Maps the JSON formatted log to the LOG entity
      let logs = new WithdrawCrop(`${receiptId}`);
      if(outcome.logs[0]!=null){
        logs.id = receipt.signerId;
        logs.output = outcome.logs[0]
        logs.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
        logs.blockHeight = BigInt.fromU64(blockHeader.height)
        logs.blockHash = blockHeader.hash.toHexString()
        logs.receiverId = receipt.receiverId
        let rawString = outcome.logs[0]
        let splitString = rawString.split(' ')
        logs.memo = splitString[0].toString() + ' ' + splitString[1].toString() + ' ' + splitString[2].toString()
        logs.amount = BigInt.fromString(splitString[3])

        logs.save()
      }

      accounts.withdrawCrops.push(logs.id);
      
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

   // change the methodName here to the methodName emitting the log in the contract
   if (functionCall.methodName == "return_tokens_callback") {
    const receiptId = receipt.id.toHexString();
      accounts.signerId = receipt.signerId;

      // Maps the JSON formatted log to the LOG entity
      let callBacks = new TokenCallback(`${receiptId}`);
      if(outcome.logs[0]!=null){
        callBacks.id = receipt.signerId;
        callBacks.output = outcome.logs[0]
        callBacks.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
        callBacks.blockHeight = BigInt.fromU64(blockHeader.height)
        callBacks.blockHash = blockHeader.hash.toHexString()
        callBacks.receiverId = receipt.receiverId
        let rawString = outcome.logs[0]
        let splitString = rawString.split(' ')
        callBacks.amount = BigInt.fromString(splitString[2])
        callBacks.memo = splitString[0].toString() + ' ' + splitString[1].toString()
      
        callBacks.save()
      }
      accounts.tokenCallbacks.push(callBacks.id);
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "close_account") {
    const receiptId = receipt.id.toHexString();
      accounts.signerId = receipt.signerId;

      // Maps the JSON formatted log to the LOG entity
      let closedAccount = new ClosedAccount(`${receiptId}`);
      if(outcome.logs[0]!=null){
        closedAccount.id = receipt.signerId;
        closedAccount.output = outcome.logs[0]
        closedAccount.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
        closedAccount.blockHeight = BigInt.fromU64(blockHeader.height)
        closedAccount.blockHash = blockHeader.hash.toHexString()
        closedAccount.receiverId = receipt.receiverId
        closedAccount.memo = outcome.logs[0]
      
        closedAccount.save()
      }
      accounts.closedAccounts.push(closedAccount.id);
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

   // change the methodName here to the methodName emitting the log in the contract
   if (functionCall.methodName == "unstake") {
    const receiptId = receipt.id.toHexString();
      accounts.signerId = receipt.signerId;

      // Maps the JSON formatted log to the LOG entity
      let unstakes = new Unstake(`${receiptId}`);
      if(outcome.logs[0]!=null){
        unstakes.id = receipt.signerId;
        unstakes.output = outcome.logs[0]
        unstakes.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
        unstakes.blockHeight = BigInt.fromU64(blockHeader.height)
        unstakes.blockHash = blockHeader.hash.toHexString()
        unstakes.predecessorId = receipt.predecessorId
        unstakes.memo = outcome.logs[0]
        let rawString = outcome.logs[0]
        let splitString = rawString.split(':')
        let balance = splitString[1].slice(1,)
        unstakes.balance = BigInt.fromString(balance)
      
        unstakes.save()
      }
      accounts.unstakes.push(unstakes.id);
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

  accounts.save();
}

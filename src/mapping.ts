import { near, log, BigInt, json, JSONValueKind } from "@graphprotocol/graph-ts";
import { WithdrawCrop, MintCallback, TokenCallback, ClosedAccount, Unstake } from "../generated/schema";

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  
  for (let i = 0; i < actions.length; i++) {
    handleAction(
      actions[i], 
      receipt.receipt, 
      receipt.block.header,
      receipt.outcome,
      receipt.receipt.signerPublicKey
      );
  }
}

function handleAction(
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome,
  publicKey: near.PublicKey
): void {
  
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }
  
  const functionCall = action.toFunctionCall();

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "withdraw_crop") {
    const receiptId = receipt.id.toBase58();

      // Maps the formatted log to the LOG entity
      let crop = new WithdrawCrop(`${receiptId}`);

      // Standard receipt properties
      crop.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      crop.blockHeight = BigInt.fromU64(blockHeader.height)
      crop.blockHash = blockHeader.hash.toBase58()
      crop.predecessorId = receipt.predecessorId
      crop.receiverId = receipt.receiverId
      crop.signerId = receipt.signerId
      crop.signerPublicKey = publicKey.bytes.toBase58()
      crop.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      crop.tokensBurned = outcome.tokensBurnt
      crop.outcomeId = outcome.id.toBase58()
      crop.executorId = outcome.executorId
      crop.outcomeBlockHash = outcome.blockHash.toBase58()

      // Log parsing
      if(outcome.logs != null && outcome.logs.length > 0){
        crop.log = outcome.logs[0]
      }

      crop.save()
      
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "mint_callback") {
    const receiptId = receipt.id.toBase58();

      // Maps the formatted log to the LOG entity
      let callBack = new MintCallback(`${receiptId}`);

      // Standard receipt properties
      callBack.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      callBack.blockHeight = BigInt.fromU64(blockHeader.height)
      callBack.blockHash = blockHeader.hash.toBase58()
      callBack.predecessorId = receipt.predecessorId
      callBack.receiverId = receipt.receiverId
      callBack.signerId = receipt.signerId
      callBack.signerPublicKey = publicKey.bytes.toBase58()
      callBack.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      callBack.tokensBurned = outcome.tokensBurnt
      callBack.outcomeId = outcome.id.toBase58()
      callBack.executorId = outcome.executorId
      callBack.outcomeBlockHash = outcome.blockHash.toBase58()

      // Log parsing
      if(outcome.logs != null && outcome.logs.length > 0){
        callBack.log = outcome.logs[0]
        let splitString = outcome.logs[0].split(' ')
        // callBack.user not available - needs to be in logs
        callBack.amount = BigInt.fromString(splitString[3])
        callBack.memo = splitString[0] + ' ' + splitString[1] + ' ' + splitString[2]
      }

      callBack.save()
      
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

   // change the methodName here to the methodName emitting the log in the contract
   if (functionCall.methodName == "return_tokens_callback") {
    const receiptId = receipt.id.toBase58();

      // Maps the formatted log to the LOG entity
      let callBacks = new TokenCallback(`${receiptId}`);

      // Standard receipt properties
      callBacks.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      callBacks.blockHeight = BigInt.fromU64(blockHeader.height)
      callBacks.blockHash = blockHeader.hash.toBase58()
      callBacks.predecessorId = receipt.predecessorId
      callBacks.receiverId = receipt.receiverId
      callBacks.signerId = receipt.signerId
      callBacks.signerPublicKey = publicKey.bytes.toBase58()
      callBacks.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      callBacks.tokensBurned = outcome.tokensBurnt
      callBacks.outcomeId = outcome.id.toBase58()
      callBacks.executorId = outcome.executorId
      callBacks.outcomeBlockHash = outcome.blockHash.toBase58()

       // Log parsing
      if(outcome.logs != null && outcome.logs.length > 0){
        callBacks.log = outcome.logs[0]
        // callBacks.user not available - needs to be in logs
        let splitString = outcome.logs[0].split(' ')
        callBacks.amount = BigInt.fromString(splitString[2])
        callBacks.memo = splitString[0].toString() + ' ' + splitString[1].toString()
      }

      callBacks.save()
     
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

  // change the methodName here to the methodName emitting the log in the contract
  if (functionCall.methodName == "close_account") {
    const receiptId = receipt.id.toBase58();

      // Maps the JSON formatted log to the LOG entity
      let closedAccount = new ClosedAccount(`${receiptId}`);

      // Standard receipt properties
      closedAccount.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      closedAccount.blockHeight = BigInt.fromU64(blockHeader.height)
      closedAccount.blockHash = blockHeader.hash.toBase58()
      closedAccount.predecessorId = receipt.predecessorId
      closedAccount.receiverId = receipt.receiverId
      closedAccount.signerId = receipt.signerId
      closedAccount.signerPublicKey = publicKey.bytes.toBase58()
      closedAccount.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      closedAccount.tokensBurned = outcome.tokensBurnt
      closedAccount.outcomeId = outcome.id.toBase58()
      closedAccount.executorId = outcome.executorId
      closedAccount.outcomeBlockHash = outcome.blockHash.toBase58()
 
       // Log parsing
      if(outcome.logs != null && outcome.logs.length > 0){
        closedAccount.log = outcome.logs[0]
      }

      closedAccount.save()
  
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

   // change the methodName here to the methodName emitting the log in the contract
   if (functionCall.methodName == "unstake") {
    const receiptId = receipt.id.toHexString();
     

      // Maps the JSON formatted log to the LOG entity
      let unstakes = new Unstake(`${receiptId}`);

      // Standard receipt properties
      unstakes.blockTime = BigInt.fromU64(blockHeader.timestampNanosec/1000000)
      unstakes.blockHeight = BigInt.fromU64(blockHeader.height)
      unstakes.blockHash = blockHeader.hash.toBase58()
      unstakes.predecessorId = receipt.predecessorId
      unstakes.receiverId = receipt.receiverId
      unstakes.signerId = receipt.signerId
      unstakes.signerPublicKey = publicKey.bytes.toBase58()
      unstakes.gasBurned = BigInt.fromU64(outcome.gasBurnt)
      unstakes.tokensBurned = outcome.tokensBurnt
      unstakes.outcomeId = outcome.id.toBase58()
      unstakes.executorId = outcome.executorId
      unstakes.outcomeBlockHash = outcome.blockHash.toBase58()
 
       // Log parsing
      if(outcome.logs != null && outcome.logs.length > 0){
        unstakes.log = outcome.logs[0]
        let splitString = outcome.logs[0].split(' ')
        unstakes.action = splitString[0]
        unstakes.account = splitString[1]
        unstakes.token = splitString[4].slice(0, -1)
        unstakes.amount = BigInt.fromString(splitString[5])      
      }

      unstakes.save()
  } else {
    log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
  }

}

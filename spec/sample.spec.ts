import { describe } from 'mocha';
import { expect } from 'chai';
import { parseTextBotCommand } from '../src';
import { TEXTING_BOT_GROUPS } from './data';

describe('Sample test', () => {
  it('finds the correct message and group', () => {
    expect(parseTextBotCommand('txt hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo',
    });
  });
});

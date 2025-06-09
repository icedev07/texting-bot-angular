import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseTextBotCommand } from '../src';
import { TEXTING_BOT_GROUPS } from './data';

describe('Text Bot Command Parser', () => {
  describe('Basic functionality', () => {
    it('finds the correct message and group for simple case', () => {
      expect(parseTextBotCommand('txt hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });

    it('handles case-insensitive group names', () => {
      expect(parseTextBotCommand('txt HOTLINE foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });

    it('handles extra whitespace in group names', () => {
      expect(parseTextBotCommand('txt   hotline   foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });
  });

  describe('Complex group names', () => {
    it('handles multi-word group names', () => {
      expect(parseTextBotCommand('txt A very long Name foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '2',
        messageToSend: 'foo',
      });
    });

    it('handles spaces within group names', () => {
      expect(parseTextBotCommand('txt A very long Name foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '2',
        messageToSend: 'foo',
      });
    });

    it('handles flexible spacing in group names', () => {
      expect(parseTextBotCommand('txt A   very   long   Name foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '2',
        messageToSend: 'foo',
      });
    });
  });

  describe('Message handling', () => {
    it('preserves message whitespace', () => {
      expect(parseTextBotCommand('txt hotline hello   world', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'hello   world',
      });
    });

    it('handles empty messages', () => {
      expect(parseTextBotCommand('txt hotline', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: '',
      });
    });

    it('handles messages with special characters', () => {
      expect(parseTextBotCommand('txt hotline hello! @#$%^&*()', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'hello! @#$%^&*()',
      });
    });
  });

  describe('Edge cases', () => {
    it('returns null for invalid input without txt prefix', () => {
      expect(parseTextBotCommand('hello hotline foo', TEXTING_BOT_GROUPS)).to.be.null;
    });

    it('returns null for non-existent group', () => {
      expect(parseTextBotCommand('txt nonexistent foo', TEXTING_BOT_GROUPS)).to.be.null;
    });

    it('handles case-insensitive txt prefix', () => {
      expect(parseTextBotCommand('TXT hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });

    it('handles mixed case in group names', () => {
      expect(parseTextBotCommand('txt HoTlInE foo', TEXTING_BOT_GROUPS)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });
  });

  describe('Longest group matching', () => {
    it('chooses the longest matching group when multiple groups match', () => {
      const groups = [
        { id: '1', name: 'test' },
        { id: '2', name: 'test copy' }
      ];
      expect(parseTextBotCommand('txt test copy one', groups)).to.deep.equals({
        groupId: '2',
        messageToSend: 'one',
      });
    });

    it('handles overlapping group names with different spacing', () => {
      const groups = [
        { id: '1', name: 'hot line' },
        { id: '2', name: 'hotline' }
      ];
      expect(parseTextBotCommand('txt hot line foo', groups)).to.deep.equals({
        groupId: '1',
        messageToSend: 'foo',
      });
    });
  });

  describe('Special cases', () => {
    it('handles group names with numbers', () => {
      const groups = [
        { id: '1', name: 'group 123' }
      ];
      expect(parseTextBotCommand('txt group 123 hello', groups)).to.deep.equals({
        groupId: '1',
        messageToSend: 'hello',
      });
    });

    it('handles group names with special characters', () => {
      const groups = [
        { id: '1', name: 'group-name' }
      ];
      expect(parseTextBotCommand('txt group-name hello', groups)).to.deep.equals({
        groupId: '1',
        messageToSend: 'hello',
      });
    });
  });
});

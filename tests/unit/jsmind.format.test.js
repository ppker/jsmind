import { expect, test } from '@jest/globals';
import { format } from '../../src/jsmind.format.js';
import { Direction } from '../../src/jsmind.common.js';

test('node tree', () => {
    const mind = format.node_tree.get_mind(fakeMindMaps.node_tree);
    checkMindData(mind);
    const data = format.node_tree.get_data(mind);
    expect(data).toStrictEqual(fakeMindMaps.node_tree);
});

test('node array', () => {
    const mind = format.node_array.get_mind(fakeMindMaps.node_array);
    checkMindData(mind);
    const data = format.node_array.get_data(mind);
    expect(data).toStrictEqual(fakeMindMaps.node_array);
});

test('freemind', () => {
    const mind = format.freemind.get_mind(fakeMindMaps.freemind);
    checkMindData(mind);
    const data = format.freemind.get_data(mind);
    console.log(data);
    expect(data).toStrictEqual(fakeMindMaps.freemind);
});

test('load same', () => {
    const mind1 = format.node_array.get_mind(fakeMindMaps.node_array);
    const mind2 = format.node_tree.get_mind(fakeMindMaps.node_tree);
    const mind3 = format.freemind.get_mind(fakeMindMaps.freemind);
    expect(mind1).toStrictEqual(mind2);
    expect(mind2).toStrictEqual(mind3);
    expect(mind3).toStrictEqual(mind1);
    expect(mind1).toStrictEqual(mind3);
    expect(mind3).toStrictEqual(mind2);
    expect(mind2).toStrictEqual(mind1);
});

test('get same', () => {
    const mind = format.node_array.get_mind(fakeMindMaps.node_array);
    const data_tree = format.node_tree.get_data(mind);
    expect(data_tree).toStrictEqual(fakeMindMaps.node_tree);
    const data_array = format.node_array.get_data(mind);
    expect(data_array).toStrictEqual(fakeMindMaps.node_array);
    const freemind = format.freemind.get_data(mind);
    expect(freemind).toStrictEqual(fakeMindMaps.freemind);
});

test('text', () => {
    const mind = format.text.get_mind(fakeMindMaps.text);
    checkTextMindData(mind);
    const data = format.text.get_data(mind);
    expect(data).toMatchObject(fakeMindMaps.text);
});

function checkMindData(mind) {
    expect(mind.name).toBe(fakeMindName);
    expect(mind.author).toBe(fakeMindAuthor);
    expect(mind.version).toBe(fakeVersion);

    const rootNode = mind.root;
    expect(rootNode.id).toBe('root');
    expect(rootNode.topic).toBe('jsMind');
    expect(rootNode.children.length).toBe(1);

    const node1 = rootNode.children[0];
    expect(node1.id).toBe('easy');
    expect(node1.topic).toBe('Easy');
    expect(node1.direction).toBe(Direction.left);
    expect(node1.expanded).toBe(false);
    expect(node1.children.length).toBe(1);
    expect(node1.data['background-color']).toBe('#ffffff');

    const node2 = node1.children[0];
    expect(node2.id).toBe('easy1');
    expect(node2.topic).toBe('Easy to show');
    expect(node2.data.ext).toBe('addition data');
    expect(node2.children.length).toBe(0);
    expect(node2.data['foreground-color']).toBe('#000000');
}

function checkTextMindData(mind) {
    expect(mind.name).toBe(fakeMindName);
    expect(mind.author).toBe(fakeMindAuthor);
    expect(mind.version).toBe(fakeVersion);

    const rootNode = mind.root;
    expect(rootNode.topic).toBe('jsMind');
    expect(rootNode.children.length).toBe(1);

    const node1 = rootNode.children[0];
    expect(node1.topic).toBe('Easy');
    expect(node1.children.length).toBe(1);

    const node2 = node1.children[0];
    expect(node2.topic).toBe('Easy to show');
    expect(node2.children.length).toBe(0);
}

const fakeMindName = 'test jsmind';
const fakeMindAuthor = 'hizzgdev';
const fakeVersion = 'version';
const fakeMindMaps = {
    node_tree: {
        meta: { name: fakeMindName, author: fakeMindAuthor, version: fakeVersion },
        format: 'node_tree',
        data: {
            id: 'root',
            topic: 'jsMind',
            expanded: true,
            children: [
                {
                    'id': 'easy',
                    'topic': 'Easy',
                    'direction': 'left',
                    'expanded': false,
                    'background-color': '#ffffff',
                    'children': [
                        {
                            'id': 'easy1',
                            'topic': 'Easy to show',
                            'expanded': true,
                            'ext': 'addition data',
                            'foreground-color': '#000000',
                        },
                    ],
                },
            ],
        },
    },
    node_array: {
        meta: { name: fakeMindName, author: fakeMindAuthor, version: fakeVersion },
        format: 'node_array',
        data: [
            { id: 'root', topic: 'jsMind', isroot: true, expanded: true },
            {
                'id': 'easy',
                'topic': 'Easy',
                'parentid': 'root',
                'direction': 'left',
                'expanded': false,
                'background-color': '#ffffff',
            },
            {
                'id': 'easy1',
                'topic': 'Easy to show',
                'parentid': 'easy',
                'expanded': true,
                'ext': 'addition data',
                'foreground-color': '#000000',
            },
        ],
    },
    freemind: {
        meta: { name: 'test jsmind', author: 'hizzgdev', version: 'version' },
        format: 'freemind',
        data: '<map version="1.0.1"><node ID="root" TEXT="jsMind"><node ID="easy" POSITION="left" FOLDED="true" BACKGROUND_COLOR="#ffffff" TEXT="Easy"><node ID="easy1" COLOR="#000000" TEXT="Easy to show"><attribute NAME="ext" VALUE="addition data"/></node></node></node></map>',
    },
    text: {
        meta: { name: 'test jsmind', author: 'hizzgdev', version: 'version' },
        format: 'text',
        data: 'jsMind\n Easy\n  Easy to show',
    },
};

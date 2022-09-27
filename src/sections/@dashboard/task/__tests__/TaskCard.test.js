import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { TaskCard } from '../';
import { MemoryRouter } from 'react-router-dom';

let maintask = {
    '_id': '242341353234234232',
    'description': 'Maintenance work required for a location near Madu river.', 
    'createdAt' : '21 Sep 2022 18:37', 
    'updatedAt' : '21 Sep 2022 18:37'
}

afterEach(()=>{
    cleanup();
});

test('should render TaskCard component', ()=>{

    render(
    <MemoryRouter>
        <TaskCard key={maintask._id} task={maintask} index={0} />
    </MemoryRouter>)
    const taskCardElement = screen.getByTestId('taskcard-1');

    expect(taskCardElement).toBeInTheDocument();
});

test('matches snapshot', ()=>{
    const tree = renderer.create(
        <MemoryRouter>
            <TaskCard key={maintask._id} task={maintask} index={0} />
        </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})
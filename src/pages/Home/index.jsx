import { Filter } from '../../components';

// Overview of rooms with filter
export default function Home() {
    return (
        <>
            <section className="container">
                <div className="heading-container justify-center">
                    <h1>Find dit <span className="blue-text">lokale</span> lokale</h1>
                </div>
                <Filter/>
            </section>
        </>
    )
}
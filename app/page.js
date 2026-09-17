'use client';

import { useMemo, useState } from 'react';
import './style.css';

const products = [
  {
    id: 1,
    name: 'Хөвсгөлийн ааруул',
    cat: 'Ааруул',
    price: 35000,
    size: '1 кг',
    place: 'Түнэл сум',
    emoji: '🥛'
  },
  {
    id: 2,
    name: 'Монгол шар тос',
    cat: 'Шар тос',
    price: 40000,
    size: '500 гр',
    place: 'Хөвсгөл',
    emoji: '🧈'
  },
  {
    id: 3,
    name: 'Гэрийн өрөм',
    cat: 'Өрөм',
    price: 28000,
    size: '500 гр',
    place: 'Архангай',
    emoji: '🥣'
  },
  {
    id: 4,
    name: 'Шинэ цөцгий',
    cat: 'Цөцгий',
    price: 12000,
    size: '500 мл',
    place: 'Булган',
    emoji: '🥛'
  },
  {
    id: 5,
    name: 'Цэвэр сүүний масло',
    cat: 'Масло',
    price: 18000,
    size: '250 гр',
    place: 'Сэлэнгэ',
    emoji: '🧈'
  },
  {
    id: 6,
    name: 'Монгол бяслаг',
    cat: 'Бяслаг',
    price: 22000,
    size: '500 гр',
    place: 'Хөвсгөл',
    emoji: '🧀'
  },
  {
    id: 7,
    name: 'Гүүний цэвэр айраг',
    cat: 'Айраг',
    price: 7000,
    size: '500 мл',
    place: 'Түнэл сум',
    emoji: '🐎'
  },
  {
    id: 8,
    name: 'Ааруулын бэлгийн багц',
    cat: 'Бэлгийн багц',
    price: 55000,
    size: '1 багц',
    place: 'Хөвсгөл',
    emoji: '🎁'
  }
];

const cats = [
  'Бүгд',
  'Ааруул',
  'Шар тос',
  'Өрөм',
  'Цөцгий',
  'Масло',
  'Бяслаг',
  'Айраг',
  'Бэлгийн багц'
];

const money = (n) =>
  new Intl.NumberFormat('mn-MN').format(n) + '₮';

export default function Home() {
  const [cat, setCat] = useState('Бүгд');
  const [q, setQ] = useState('');
  const [cart, setCart] = useState([]);
  const [seller, setSeller] = useState(false);
  const [login, setLogin] = useState(false);

  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === 'Бүгд' || p.cat === cat) &&
          (p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.place.toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  );

  const total = cart.reduce((s, p) => s + p.price, 0);

  const add = (p) => {
    setCart([...cart, p]);
  };

  return (
    <main>
      <header>
        <div className="brand">
          🥛
          <div>
            <span>ЦАГААН ИДЭЭ</span>
            <small>Монголын цагаан идээний онлайн зах</small>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => setLogin(true)}>
            Нэвтрэх
          </button>

          <button
            className="cart"
            onClick={() =>
              alert(
                cart.length
                  ? `Сагс: ${cart.length} бараа • ${money(total)}`
                  : 'Сагс хоосон'
              )
            }
          >
            🛒 {cart.length}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            МОНГОЛЫН ӨВ · ШИНЭХЭН БҮТЭЭГДЭХҮҮН
          </p>

          <h1>
            Жинхэнэ цагаан
            <br />
            идээг
            <br />
            шууд
            <br />
            үйлдвэрлэгчээс.
          </h1>

          <p>
            Ааруул, өрөм, шар тос, цөцгий, бяслаг,
            айраг болон бусад бүтээгдэхүүнийг
            Монголын үйлдвэрлэгчдээс нэг дор.
          </p>

          <button
            className="primary"
            onClick={() =>
              document
                .getElementById('products')
                .scrollIntoView({ behavior: 'smooth' })
            }
          >
            Бараа үзэх →
          </button>
        </div>

        <div className="hero-art">
          🐎
          <br />
          <span>🥛 🧈 🧀</span>
        </div>
      </section>

      <section className="toolbar">
        <input
          placeholder="🔎  Бараа, аймаг, сум хайх..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="cats">
          {cats.map((c) => (
            <button
              className={cat === c ? 'active' : ''}
              onClick={() => setCat(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section id="products" className="section">
        <div className="section-head">
          <div>
            <h2>Шинэ бүтээгдэхүүн</h2>
            <p>{list.length} бүтээгдэхүүн</p>
          </div>

          <button
            onClick={() => setSeller(true)}
            className="outline"
          >
            ＋ Бараагаа зараарай
          </button>
        </div>

        <div className="grid">
          {list.map((p) => (
            <article className="card" key={p.id}>
              <div className="photo">{p.emoji}</div>

              <div className="body">
                <span className="tag">{p.cat}</span>

                <h3>{p.name}</h3>

                <p>
                  📍 {p.place} · {p.size}
                </p>

                <strong>{money(p.price)}</strong>

                <button
                  className="buy"
                  onClick={() => add(p)}
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sell">
        <div>
          <p className="eyebrow">
            ҮЙЛДВЭРЛЭГЧ, МАЛЧИН, БОРЛУУЛАГЧ БҮРТ
          </p>

          <h2>
            Өөрийн цагаан идээгээ
            <br />
            Монгол даяар зараарай.
          </h2>

          <p>
            Өөрийн дэлгүүрээ нээгээд бүтээгдэхүүнээ нэм.
            Захиалгаа нэг дор удирдана.
          </p>
        </div>

        <button
          className="primary"
          onClick={() => setSeller(true)}
        >
          Худалдагчаар бүртгүүлэх →
        </button>
      </section>

      <section className="steps">
        <h2>Хэрхэн ажиллах вэ?</h2>

        <div className="stepgrid">
          {[
            [
              '01',
              'Бүртгүүлэх',
              'Хэрэглэгч эсвэл худалдагчаар бүртгүүлнэ.'
            ],
            [
              '02',
              'Бараа сонгох',
              'Бүтээгдэхүүнээ сонгон сагсанд нэмнэ.'
            ],
            [
              '03',
              'Төлбөр хийх',
              'QPay болон боломжит төлбөрийн аргаар төлнө.'
            ],
            [
              '04',
              'Хүлээн авах',
              'Захиалгаа хүргэлтээр эсвэл тохирсон газраас авна.'
            ]
          ].map((x) => (
            <div className="step" key={x[0]}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <b>🥛 ЦАГААН ИДЭЭ</b>
        <span>
          Монгол цагаан идээг үйлдвэрлэгчээс хэрэглэгчид.
        </span>
        <span>© 2026</span>
      </footer>

      {seller && (
        <Modal
          title="Худалдагчаар бүртгүүлэх"
          close={() => setSeller(false)}
        >
          <input placeholder="Нэр / дэлгүүрийн нэр" />
          <input placeholder="Утасны дугаар" />
          <input placeholder="Аймаг, сум" />
          <textarea placeholder="Ямар цагаан идээ зардаг вэ?" />

          <button
            className="primary"
            onClick={() => {
              setSeller(false);
              alert(
                'Хүсэлт илгээгдлээ. Админ баталгаажуулсны дараа дэлгүүр нээгдэнэ.'
              );
            }}
          >
            Хүсэлт илгээх
          </button>
        </Modal>
      )}

      {login && (
        <Modal
          title="Нэвтрэх / бүртгүүлэх"
          close={() => setLogin(false)}
        >
          <input placeholder="Утасны дугаар" />
          <input
            placeholder="Нууц үг"
            type="password"
          />

          <button
            className="primary"
            onClick={() => {
              setLogin(false);
              alert(
                'Дараагийн хувилбарт SMS баталгаажуулалт холбогдоно.'
              );
            }}
          >
            Нэвтрэх
          </button>
        </Modal>
      )}
    </main>
  );
}

function Modal({ title, close, children }) {
  return (
    <div className="shade" onClick={close}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="x" onClick={close}>
          ×
        </button>

        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

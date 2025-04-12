const ProductModel = require("../model/Product-model");
const CartModel = require("../model/cart");

//helper function to get a cart by user id and guset id
const getCart = async (userId, guestId) => {
  if (userId) {
    return await CartModel.findOne({ user: userId });
  } else if (guestId) {
    return await CartModel.findOne({ guestId: guestId });
  }
  return null;
};

const cartItem = async (req, res) => {
  const { productId, quantity, sizes, color, guestId } = req.body;
  const userId = req.body?.userId || req.query?.userId;

  if (!productId) {
    return res.status(400).json({ message: "Product ID are required" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let userCart = await getCart(userId, guestId);

    // if the cart exists, update it
    if (userCart) {
      const productIndex = userCart.products.findIndex(
        (p) =>
          p.productId &&
          p.productId.toString() === productId.toString() &&
          p.sizes === sizes &&
          p.color === color
      );

      if (productIndex > -1) {
        userCart.products[productIndex].quantity =
          Number(userCart.products[productIndex].quantity) + Number(quantity);
      } else {
        userCart.products.push({
          productId,
          name: product.name,
          images: product.images[0].url,
          price: Number(product.price),
          sizes,
          color,
          quantity: Number(quantity),
        });
      }

      // Calculate total price using parsed numbers
      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );

      await userCart.save();
      return res.status(200).json(userCart);
    } else {
      const parsedPrice = Number(product.price);
      const parsedQuantity = Number(quantity);

      // create a new cart with validated numbers
      const newCart = await CartModel.create({
        user: userId || undefined,
        guestId: guestId || `guest_${new Date().getTime()}`,
        products: [
          {
            productId,
            name: product.name,
            images: product.images[0]?.url || "",
            price: parsedPrice,
            sizes,
            color,
            quantity: parsedQuantity,
          },
        ],
        totalPrice: parsedPrice * parsedQuantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//put carts
const CartPut = async (req, res) => {
  const { productId, quantity, sizes, color, guestId, userId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    // First check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let PutCart = await getCart(userId, guestId);
    if (!PutCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = PutCart.products.findIndex(
      (p) =>
        p.productId?.toString() === productId?.toString() &&
        p.sizes === sizes &&
        p.color === color
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        PutCart.products[productIndex].quantity = Number(quantity);
      } else {
        PutCart.products.splice(productIndex, 1);
      }

      PutCart.totalPrice = PutCart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );

      const savedCart = await PutCart.save();
      return res.status(200).json(savedCart);
    } else {
      // Add new product to cart if it exists in database but not in cart
      PutCart.products.push({
        productId,
        name: product.name,
        images: product.images[0]?.url || "",
        price: Number(product.price),
        sizes,
        color,
        quantity: Number(quantity),
      });

      PutCart.totalPrice = PutCart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );

      const savedCart = await PutCart.save();
      return res.status(200).json(savedCart);
    }
  } catch (error) {
    console.error("Cart update error:", error);
    return res.status(500).json({
      message: "Server error while updating cart",
      error: error.message,
      stack: error.stack,
    });
  }
};

// remove cart

const CartDelete = async (req, res) => {
  const { productId, quantity, sizes, color, guestId, userId } = req.body;
  try {
    let deleteCart = await getCart(userId, guestId);
    if (!deleteCart)
      return res.status(400).json({ message: " deleteCart Not  found" });

    const productIndex = deleteCart.products.findIndex(
      (p) =>
        p.productId?.toString() === productId?.toString() &&
        p.sizes === sizes &&
        p.color === color
    );

    if (productIndex > -1) {
      deleteCart.products.splice(productIndex, 1);
      deleteCart.totalPrice = deleteCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await deleteCart.save();
      return res
        .status(200)
        .json({ message: "product deleted succesfully", deleteCart });
    } else {
      return res.status(404).json({ message: "product cart is required" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// get cart
const GetCart = async (req, res) => {
  const userId = req.body?.userId || req.query?.userId;
  const guestId = req.body?.guestId || req.query?.guestId;

  if (!userId && !guestId) {
    return res.status(400).json({
      message: "Either UserId or GuestId is required",
    });
  }

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({
        message: "Cart not found",
        params: { userId, guestId },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      params: { userId, guestId },
    });
  }
};

//merge cart

const MergeCart = async (req, res) => {
  const guestId = req.body?.guestId || req.query.guestId;
  const userId = req.user?.id;

  if (!guestId) {
    return res.status(400).json({ message: "GuestId is required" });
  }

  try {
    const guestCart = await CartModel.findOne({ guestId });
    const userCart = await CartModel.findOne({ user: userId });

    if (!guestCart) {
      if (userCart) {
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }

    if (guestCart.products.length === 0) {
      return res.status(400).json({ message: "Guest cart is empty" });
    }

    if (userCart) {
      guestCart.products.forEach((guestItem) => {
        const productIndex = userCart.products.findIndex(
          (item) =>
            item.productId.toString() === guestItem.productId.toString() &&
            item.sizes === guestItem.sizes &&
            item.color === guestItem.color
        );
        if (productIndex > -1) {
          userCart.products[productIndex].quantity += guestItem.quantity;
        } else {
          userCart.products.push(guestItem);
        }
      });

      userCart.totalPrice = userCart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await userCart.save();

      await CartModel.findOneAndDelete({ guestId });

      // return res.status(200).json({ ...userCart.toObject(), userId });
    } else {
      guestCart.user = userId;
      guestCart.guestId = undefined;
      await guestCart.save();

      return res.status(200).json(guestCart);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { cartItem, CartPut, CartDelete, GetCart, MergeCart };
